import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import connectDB from "@/lib/db";
import { createSession } from "@/lib/auth";
import Customer, { DeviceType } from "@/models/User";

/**
 * Get client IP address
 */
function getClientIp(request: NextRequest): string | undefined {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    undefined
  );
}

/**
 * Get approximate location from IP
 */
async function getIpLocation(ipAddress?: string) {
  if (
    !ipAddress ||
    ipAddress === "127.0.0.1" ||
    ipAddress === "::1" ||
    ipAddress === "localhost"
  ) {
    return undefined;
  }

  try {
    const response = await fetch(
      `https://ipapi.co/${encodeURIComponent(ipAddress)}/json/`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();

    if (data.error) {
      return undefined;
    }

    return {
      country: data.country_name || undefined,
      state: data.region || undefined,
      city: data.city || undefined,
    };
  } catch (error) {
    console.error("IP LOCATION ERROR:", error);

    return undefined;
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, firstName, lastName, phone } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 },
      );
    }

    if (typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required",
        },
        { status: 400 },
      );
    }

    const normalizedFirstName = firstName.trim();

    if (normalizedFirstName.length < 2 || normalizedFirstName.length > 50) {
      return NextResponse.json(
        {
          success: false,
          message: "First name must be between 2 and 50 characters",
        },
        { status: 400 },
      );
    }

    if (typeof lastName !== "string" || !lastName.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Last name is required",
        },
        { status: 400 },
      );
    }

    const normalizedLastName = lastName.trim();

    if (normalizedLastName.length < 2 || normalizedLastName.length > 50) {
      return NextResponse.json(
        {
          success: false,
          message: "Last name must be between 2 and 50 characters",
        },
        { status: 400 },
      );
    }

    if (typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 },
      );
    }

    const normalizedPhone = phone.trim();

    // Indian 10-digit phone validation
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 10-digit phone number",
        },
        { status: 400 },
      );
    }

    const customer = await Customer.findOne({
      email: normalizedEmail,
      emailVerified: true,
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email first",
        },
        { status: 403 },
      );
    }

    if (customer.status === "blocked") {
      return NextResponse.json(
        {
          success: false,
          message: "This account has been blocked",
        },
        { status: 403 },
      );
    }

    if (customer.status === "active") {
      return NextResponse.json(
        {
          success: false,
          message: "Account is already registered",
        },
        { status: 409 },
      );
    }

    customer.firstName = normalizedFirstName;

    customer.lastName = normalizedLastName;

    customer.phone = normalizedPhone;

    customer.status = "active";

    const ipAddress = getClientIp(request);

    const userAgent = request.headers.get("user-agent") || undefined;

    const parser = new UAParser(userAgent);

    const result = parser.getResult();

    const deviceType: DeviceType =
      result.device.type === "mobile"
        ? "mobile"
        : result.device.type === "tablet"
          ? "tablet"
          : "desktop";

    const deviceName = result.device.model || result.device.vendor || undefined;

    const browserName = result.browser.name || undefined;

    const location = await getIpLocation(ipAddress);

    const token = await createSession(customer._id.toString());

    customer.loginHistory.push({
      loginAt: new Date(),

      ipAddress,

      device: {
        type: deviceType,
        name: deviceName,
      },

      browser: {
        name: browserName,
      },

      location,

      success: true,
    });

    await customer.save();

    const cookieStore = await cookies();

    cookieStore.set("s_token", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",

      maxAge: 60 * 60 * 24 * 30,

      path: "/",
    });

    return NextResponse.json(
      {
        success: true,

        message: "Registration completed successfully",

        data: {
          id: customer._id,

          customerId: customer.customerId,

          email: customer.email,

          firstName: customer.firstName,

          lastName: customer.lastName,

          phone: customer.phone,

          emailVerified: customer.emailVerified,

          status: customer.status,
        },

        nextStep: "authenticated",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("REGISTER ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to complete registration";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 },
    );
  }
}

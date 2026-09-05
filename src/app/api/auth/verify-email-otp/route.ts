import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Customer, { DeviceType } from "@/models/User";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";

import { UAParser } from "ua-parser-js";

const MAX_ATTEMPTS = 5;
const SESSION_MAX_AGE = 60 * 60 * 24 * 15; // 15 days

/**
 * Get approximate location from IP address.
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

    // ipapi.co can return an error response
    if (data.error) {
      return undefined;
    }

    return {
      country: data.country_name || undefined,
      state: data.region || undefined,
      city: data.city || undefined,
    };
  } catch (error) {
    console.error("IP location lookup failed:", error);
    return undefined;
  }
}

/**
 * Get client IP address.
 */
function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    // Example:
    // x-forwarded-for: 103.123.45.67, 10.0.0.1
    return forwardedFor.split(",")[0]?.trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    undefined
  );
}

/**
 * Hash OTP using SHA-256.
 */
function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

/**
 * Compare two hashes safely.
 */
function compareHashes(storedHash: string, submittedHash: string): boolean {
  const storedBuffer = Buffer.from(storedHash, "hex");
  const submittedBuffer = Buffer.from(submittedHash, "hex");

  if (storedBuffer.length !== submittedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedBuffer, submittedBuffer);
}

export async function POST(request: NextRequest) {
  try {

    await connectDB();

    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

    const otp =
      typeof body.otp === "string" || typeof body.otp === "number"
        ? String(body.otp).trim()
        : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP must be a 6-digit number.",
        },
        { status: 400 },
      );
    }

    const customer = await Customer.findOne({ email }).select(
      "+emailOtpHash +emailOtpExpiresAt +emailOtpAttempts",
    );

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found.",
        },
        { status: 404 },
      );
    }

    if (customer.status === "blocked") {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been blocked. Please contact support.",
        },
        { status: 403 },
      );
    }

    if (!customer.emailOtpHash || !customer.emailOtpExpiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP is invalid or has expired. Please request a new OTP.",
        },
        { status: 400 },
      );
    }

    const attempts = customer.emailOtpAttempts || 0;

    if (attempts >= MAX_ATTEMPTS) {
      customer.emailOtpHash = undefined;
      customer.emailOtpExpiresAt = undefined;
      customer.emailOtpAttempts = 0;

      await customer.save();

      return NextResponse.json(
        {
          success: false,
          message: "Maximum OTP attempts exceeded. Please request a new OTP.",
        },
        { status: 429 },
      );
    }

    if (new Date(customer.emailOtpExpiresAt).getTime() < Date.now()) {
      customer.emailOtpHash = undefined;
      customer.emailOtpExpiresAt = undefined;
      customer.emailOtpAttempts = 0;

      await customer.save();

      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new OTP.",
        },
        { status: 400 },
      );
    }

    const submittedOtpHash = hashOtp(otp);

    const isOtpValid = compareHashes(customer.emailOtpHash, submittedOtpHash);

    if (!isOtpValid) {
      customer.emailOtpAttempts = attempts + 1;

      await customer.save();

      const remainingAttempts = MAX_ATTEMPTS - customer.emailOtpAttempts;

      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP.",
          remainingAttempts,
        },
        { status: 400 },
      );
    }

    customer.emailVerified = true;

    customer.emailOtpHash = undefined;
    customer.emailOtpExpiresAt = undefined;
    customer.emailOtpAttempts = 0;

    if (customer.status === "pending") {
      await customer.save();

      return NextResponse.json(
        {
          success: true,
          message: "Email verified successfully.",
          nextStep: "register",
          customerId: customer._id.toString(),
        },
        { status: 200 },
      );
    }

    if (customer.status !== "active") {
      await customer.save();

      return NextResponse.json(
        {
          success: true,
          message: "Email verified successfully.",
          nextStep: "register",
          customerId: customer._id.toString(),
        },
        { status: 200 },
      );
    }

    const session = await createSession(customer._id.toString());

    const sessionToken = session;

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

    const osName = result.os.name || undefined;

    const osVersion = result.os.version || undefined;

    const location = await getIpLocation(ipAddress);

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

    cookieStore.set("s_token", sessionToken, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",

      maxAge: SESSION_MAX_AGE,

      path: "/",
    });

    return NextResponse.json(
      {
        success: true,

        message: "Login successful.",

        nextStep: "dashboard",

        customer: {
          id: customer._id.toString(),
          customerId: customer.customerId,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          profileImage: customer.profileImage,
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Verify email OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}

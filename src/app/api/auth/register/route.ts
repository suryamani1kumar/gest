import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Customer from "@/models/User";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      email,
      firstName,
      lastName,
      phone,
    } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    const normalizedEmail =
      String(email).toLowerCase().trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 },
      );
    }

    if (!firstName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required",
        },
        { status: 400 },
      );
    }

    const normalizedFirstName =
      String(firstName).trim();

    if (
      normalizedFirstName.length < 2 ||
      normalizedFirstName.length > 50
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "First name must be between 2 and 50 characters",
        },
        { status: 400 },
      );
    }

    if (!lastName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Last name is required",
        },
        { status: 400 },
      );
    }

    const normalizedLastName =
      String(lastName).trim();

    if (
      normalizedLastName.length < 2 ||
      normalizedLastName.length > 50
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Last name must be between 2 and 50 characters",
        },
        { status: 400 },
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 },
      );
    }

    const normalizedPhone =
      String(phone).trim();

    // Indian 10-digit phone validation
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid 10-digit phone number",
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
          message:
            "Please verify your email first",
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

    customer.firstName =
      normalizedFirstName;

    customer.lastName =
      normalizedLastName;

    customer.phone =
      normalizedPhone;

    customer.status = "active";

    customer.lastLogin = new Date();

    await customer.save();

    const token = await createSession(
      customer._id.toString(),
    );

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      maxAge:
        60 * 60 * 24 * 30, // 30 days

      path: "/",
    });

    return NextResponse.json(
      {
        success: true,

        message:
          "Registration completed successfully",

        data: {
          id: customer._id,
          email: customer.email,
          firstName:
            customer.firstName,
          lastName:
            customer.lastName,
          phone:
            customer.phone,
          emailVerified:
            customer.emailVerified,
          status:
            customer.status,
        },

        nextStep:
          "authenticated",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(
      "REGISTER ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to complete registration",
      },
      { status: 500 },
    );
  }
}


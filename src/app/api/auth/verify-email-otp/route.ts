import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Customer from "@/models/User";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const email = body.email;
    const otp = body.otp;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    if (!otp) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP is required",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedOTP = String(otp).trim();

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

    if (!/^\d{6}$/.test(normalizedOTP)) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP must be a 6-digit number",
        },
        { status: 400 },
      );
    }

    const customer = await Customer.findOne({
      email: normalizedEmail,
    }).select(
      "+emailOtpHash +emailOtpExpiresAt +emailOtpAttempts",
    );

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No verification request found for this email",
        },
        { status: 404 },
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

    if (
      !customer.emailOtpHash ||
      !customer.emailOtpExpiresAt
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "OTP not found. Please request a new OTP",
        },
        { status: 400 },
      );
    }

    const MAX_ATTEMPTS = 5;

    if (
      customer.emailOtpAttempts >= MAX_ATTEMPTS
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many incorrect OTP attempts. Please request a new OTP",
        },
        { status: 429 },
      );
    }

    if (
      new Date(
        customer.emailOtpExpiresAt,
      ).getTime() < Date.now()
    ) {
      customer.emailOtpHash = undefined;
      customer.emailOtpExpiresAt = undefined;
      customer.emailOtpAttempts = 0;

      await customer.save();

      return NextResponse.json(
        {
          success: false,
          message:
            "OTP has expired. Please request a new OTP",
        },
        { status: 400 },
      );
    }

    const otpHash = crypto
      .createHash("sha256")
      .update(normalizedOTP)
      .digest("hex");

    const isValidOTP =
      customer.emailOtpHash.length ===
        otpHash.length &&
      crypto.timingSafeEqual(
        Buffer.from(otpHash, "hex"),
        Buffer.from(
          customer.emailOtpHash,
          "hex",
        ),
      );

    if (!isValidOTP) {
      customer.emailOtpAttempts += 1;

      await customer.save();

      const remainingAttempts =
        MAX_ATTEMPTS -
        customer.emailOtpAttempts;

      return NextResponse.json(
        {
          success: false,
          message:
            remainingAttempts > 0
              ? "Invalid OTP"
              : "Too many incorrect OTP attempts. Please request a new OTP",

          remainingAttempts: Math.max(
            remainingAttempts,
            0,
          ),
        },
        {
          status:
            remainingAttempts > 0
              ? 400
              : 429,
        },
      );
    }

    const isExistingUser =
      customer.status === "active";

    customer.emailVerified = true;

    // Clear OTP
    customer.emailOtpHash = undefined;
    customer.emailOtpExpiresAt = undefined;
    customer.emailOtpAttempts = 0;

    if (isExistingUser) {
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
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      return NextResponse.json(
        {
          success: true,

          message: "Login successful",

          isExistingUser: true,

          needsProfile: false,

          email: customer.email,

          nextStep: "authenticated",
        },
        { status: 200 },
      );
    }

    await customer.save();

    return NextResponse.json(
      {
        success: true,

        message:
          "Email verified successfully",

        isExistingUser: false,

        needsProfile: true,

        email: customer.email,

        nextStep: "register",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(
      "VERIFY EMAIL OTP ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to verify OTP",
      },
      { status: 500 },
    );
  }
}
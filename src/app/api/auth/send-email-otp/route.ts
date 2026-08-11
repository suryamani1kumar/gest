import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Customer from "@/models/User";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

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

    let customer = await Customer.findOne({
      email: normalizedEmail,
    }).select("+emailOtpHash +emailOtpExpiresAt +emailOtpAttempts");

    if (customer?.status === "blocked") {
      return NextResponse.json(
        {
          success: false,
          message: "This account has been blocked",
        },
        { status: 403 },
      );
    }

    if (customer?.emailOtpExpiresAt) {
      const otpCreatedTime =
        new Date(customer.emailOtpExpiresAt).getTime() - 10 * 60 * 1000;

      const secondsSinceLastOTP = (Date.now() - otpCreatedTime) / 1000;

      if (secondsSinceLastOTP < 60) {
        const remainingSeconds = Math.ceil(60 - secondsSinceLastOTP);

        return NextResponse.json(
          {
            success: false,
            message: `Please wait ${remainingSeconds} seconds before requesting another OTP`,
            retryAfter: remainingSeconds,
          },
          { status: 429 },
        );
      }
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    if (!customer) {
      customer = await Customer.create({
        email: normalizedEmail,

        status: "pending",

        emailVerified: false,

        provider: "email",

        emailOtpHash: otpHash,

        emailOtpExpiresAt: expiresAt,

        emailOtpAttempts: 0,
      });
    } else {
      customer.emailOtpHash = otpHash;
      customer.emailOtpExpiresAt = expiresAt;
      customer.emailOtpAttempts = 0;

      await customer.save();
    }

    try {
      await sendEmail({
        to: normalizedEmail,

        subject: "Your Verification Code",

        html: `
          <!DOCTYPE html>

          <html>
            <body
              style="
                margin:0;
                padding:0;
                background:#f5f5f5;
                font-family:Arial,sans-serif;
              "
            >

              <div
                style="
                  max-width:600px;
                  margin:40px auto;
                  background:#ffffff;
                  padding:40px;
                  border-radius:12px;
                "
              >

                <h2 style="color:#7A1F1F;">
                  Verify Your Email
                </h2>

                <p>
                  Use the following OTP to verify your email address and continue:
                </p>

                <div
                  style="
                    margin:30px 0;
                    text-align:center;
                  "
                >

                  <span
                    style="
                      display:inline-block;
                      padding:15px 30px;
                      background:#f7eeee;
                      color:#7A1F1F;
                      font-size:32px;
                      font-weight:bold;
                      letter-spacing:8px;
                      border-radius:8px;
                    "
                  >
                    ${otp}
                  </span>

                </div>

                <p>
                  This OTP will expire in 1 minutes.
                </p>

                <p>
                  For your security, do not share this verification code with.
                </p>
                <p>
                  If you did not request this OTP, please ignore this email.
                </p>
                <p style="
                    margin-top:60px;
                  ">
                  Thank you,
                </p>
                 <p>
                  <strong>[Your Company Name]</strong>
                </p>
                <p>
                  Gemstones & Jewellery
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("EMAIL SEND ERROR:", emailError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send verification email. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "OTP has been sent to your email",
        expiresIn: 600,
        email: normalizedEmail,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("SEND EMAIL OTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send verification OTP",
      },
      { status: 500 },
    );
  }
}

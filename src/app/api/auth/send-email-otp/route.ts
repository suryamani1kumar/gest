import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Customer from "@/models/User";
import { sendEmail } from "@/lib/email";
import { generateCustomerId } from "@/lib/data";

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
        new Date(customer.emailOtpExpiresAt).getTime() - 3 * 60 * 1000;

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

    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

    if (!customer) {
      const customerId = generateCustomerId(normalizedEmail);

      customer = await Customer.create({
        email: normalizedEmail,

        customerId: customerId,

        status: "pending",

        emailVerified: false,

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

        subject: "Your Email Verification Code | R.K. JEWELLERS & GEMS",

        html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background-color:#f6f3f1;
          font-family:Arial, Helvetica, sans-serif;
          color:#333333;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color:#f6f3f1; padding:40px 15px;"
        >
          <tr>
            <td align="center">

              <!-- Main Container -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width:600px;
                  background-color:#ffffff;
                  border-radius:12px;
                  overflow:hidden;
                "
              >

                <!-- Brand Header -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding:32px 30px;
                      background-color:#7A1F1F;
                    "
                  >
                    <div
                      style="
                        color:#ffffff;
                        font-size:22px;
                        font-weight:bold;
                        letter-spacing:1.5px;
                      "
                    >
                      R.K. JEWELLERS &amp; GEMS
                    </div>

                    <div
                      style="
                        margin-top:8px;
                        color:#f5dddd;
                        font-size:12px;
                        letter-spacing:1px;
                      "
                    >
                      AUTHENTICITY • QUALITY • TRUST
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:40px 40px 35px;">

                    <h1
                      style="
                        margin:0 0 20px;
                        color:#7A1F1F;
                        font-size:26px;
                        font-weight:600;
                        text-align:center;
                      "
                    >
                      Verify Your Email
                    </h1>

                    <p
                      style="
                        margin:0 0 18px;
                        font-size:15px;
                        line-height:1.7;
                        color:#444444;
                      "
                    >
                      Thank you for choosing
                      <strong>R.K. JEWELLERS &amp; GEMS</strong>.
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:15px;
                        line-height:1.7;
                        color:#444444;
                      "
                    >
                      Please use the verification code below to
                      confirm your email address and continue.
                    </p>

                    <!-- OTP Box -->
                    <div
                      style="
                        margin:32px 0;
                        padding:25px 15px;
                        text-align:center;
                        background-color:#faf5f5;
                        border:1px solid #eadada;
                        border-radius:10px;
                      "
                    >

                      <div
                        style="
                          margin-bottom:10px;
                          font-size:12px;
                          color:#777777;
                          text-transform:uppercase;
                          letter-spacing:1.5px;
                        "
                      >
                        Verification Code
                      </div>

                      <div
                        style="
                          color:#7A1F1F;
                          font-size:34px;
                          font-weight:bold;
                          letter-spacing:8px;
                        "
                      >
                        ${otp}
                      </div>

                    </div>

                    <!-- Expiry -->
                    <p
                      style="
                        margin:0 0 15px;
                        font-size:14px;
                        line-height:1.6;
                        color:#555555;
                      "
                    >
                      This verification code is valid for
                      <strong>3 minutes</strong> and can be used only once.
                    </p>

                    <!-- Security -->
                    <p
                      style="
                        margin:0 0 15px;
                        font-size:14px;
                        line-height:1.6;
                        color:#555555;
                      "
                    >
                      <strong>Security Notice:</strong>
                      Never share this verification code with anyone.
                      Our team will never ask you for your OTP.
                    </p>

                    <!-- Wrong Request -->
                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.6;
                        color:#555555;
                      "
                    >
                      If you did not request this verification code,
                      you can safely ignore this email.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding:25px 30px;
                      background-color:#fafafa;
                      border-top:1px solid #eeeeee;
                    "
                  >

                    <p
                      style="
                        margin:0 0 8px;
                        font-size:13px;
                        color:#777777;
                      "
                    >
                      Thank you for choosing us.
                    </p>

                    <p
                      style="
                        margin:0;
                        color:#7A1F1F;
                        font-size:14px;
                        font-weight:bold;
                        letter-spacing:0.5px;
                      "
                    >
                      R.K. JEWELLERS &amp; GEMS
                    </p>

                    <p
                      style="
                        margin:10px 0 0;
                        font-size:11px;
                        color:#999999;
                      "
                    >
                      This is an automated email. Please do not reply.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

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

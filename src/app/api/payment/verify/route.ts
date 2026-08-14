import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    console.log("body", body);
    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 },
      );
    }

    // Payment is verified
    // Update your MongoDB order here

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed",
      },
      { status: 500 },
    );
  }
}

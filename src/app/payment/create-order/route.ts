import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 },
      );
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // INR -> paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create Razorpay order",
      },
      { status: 500 },
    );
  }
}

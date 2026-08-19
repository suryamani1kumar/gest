import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import Cart from "@/models/Cart";
import { verifySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment details are missing",
        },
        { status: 400 },
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      throw new Error("RAZORPAY_KEY_SECRET is not configured");
    }

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature),
    );

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    if (
      order.razorpayOrderId &&
      order.razorpayOrderId !== razorpay_order_id
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Razorpay order mismatch",
        },
        { status: 400 },
      );
    }

    const existingPayment = await Payment.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });

    if (existingPayment) {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
        orderNumber: order.orderNumber,
      });
    }

    await Payment.create({
      order: order._id,
      customer: order.customer,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,

      amount: order.total,
      currency: "INR",

      status: "captured",

      paidAt: new Date(),
    });

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";

    order.razorpayOrderId = razorpay_order_id;
    order.razorpayPaymentId = razorpay_payment_id;

    await order.save();

    const token = req.cookies.get("s_token")?.value;

    if (token) {
      const session = await verifySession(token);

      if (session?.userId) {
        await Cart.findOneAndUpdate(
          {
            customer: session.userId,
          },
          {
            $set: {
              items: [],
            },
          },
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      orderNumber: order.orderNumber,
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

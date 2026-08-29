import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { verifySession } from "@/lib/auth";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("s_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const session = await verifySession(token);
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 },
      );
    }

    const orders = await Order.find({ customer: session.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

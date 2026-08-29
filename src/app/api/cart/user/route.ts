import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Cart from "@/models/Cart";
import { verifySession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("s_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const session = await verifySession(token);
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const userId = session.userId;

    const cart = await Cart.findOne({ customer: userId }).populate("items.product");

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
      data: cart.items,
    });
  } catch (error: any) {
    console.error("Fetch cart error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

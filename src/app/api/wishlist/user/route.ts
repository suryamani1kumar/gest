import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Wishlist from "@/models/Wishlist";
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

    const wishlist = await Wishlist.findOne({ customer: userId }).populate("products");

    if (!wishlist) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
      data: wishlist.products,
    });
  } catch (error: any) {
    console.error("Fetch wishlist error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

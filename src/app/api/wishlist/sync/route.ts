import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import mongoose from "mongoose";
import { verifySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { products = [] } = body; // Array of productIds

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ success: true, message: "No items to sync" });
    }

    let wishlist = await Wishlist.findOne({ customer: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        customer: userId,
        products: [],
      });
    }

    // Merge items
    for (const productId of products) {
      if (!mongoose.Types.ObjectId.isValid(productId)) continue;

      const exists = wishlist.products.some(
        (id: any) => id.toString() === productId
      );

      if (!exists) {
        wishlist.products.push(new mongoose.Types.ObjectId(productId));
      }
    }

    await wishlist.save();
    await wishlist.populate("products");

    return NextResponse.json({
      success: true,
      message: "Wishlist synced successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Wishlist sync error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

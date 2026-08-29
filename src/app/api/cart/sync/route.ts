import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Cart from "@/models/Cart";
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
    const { items = [] } = body; // Array of { productId, quantity }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: true, message: "No items to sync" });
    }

    let cart = await Cart.findOne({ customer: userId });

    if (!cart) {
      cart = await Cart.create({
        customer: userId,
        items: [],
      });
    }

    // Merge items
    for (const item of items) {
      const { productId, quantity } = item;
      
      if (!mongoose.Types.ObjectId.isValid(productId)) continue;

      const existingItem = cart.items.find(
        (i: any) => i.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: new mongoose.Types.ObjectId(productId),
          quantity: quantity > 0 ? quantity : 1,
        });
      }
    }

    await cart.save();
    await cart.populate("items.product");

    return NextResponse.json({
      success: true,
      message: "Cart synced successfully",
      cart,
    });
  } catch (error) {
    console.error("Cart sync error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

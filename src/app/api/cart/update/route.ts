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
    const { productId, quantity } = body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ customer: userId });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        (item: any) => item.product.toString() !== productId
      );
    } else {
      const existingItem = cart.items.find(
        (item: any) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cart.items.push({
          product: new mongoose.Types.ObjectId(productId),
          quantity,
        });
      }
    }

    await cart.save();
    await cart.populate("items.product");

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

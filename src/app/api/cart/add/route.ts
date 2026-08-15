import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Cart from "@/models/Cart";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { productId, quantity = 1 } = body;

    // Get user ID from your auth system
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID",
        },
        { status: 400 },
      );
    }

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 },
      );
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Quantity must be at least 1",
        },
        { status: 400 },
      );
    }

    // Check product
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    // Check stock
    const stock = product.inventory?.stock ?? 0;

    if (stock < quantity) {
      return NextResponse.json(
        {
          success: false,
          message: "Not enough stock available",
        },
        { status: 400 },
      );
    }

    // Find user's cart
    let cart = await Cart.findOne({ customer: userId });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await Cart.create({
        customer: userId,
        items: [
          {
            product: productId,
            quantity,
          },
        ],
      });

      await cart.populate("items.product");

      return NextResponse.json(
        {
          success: true,
          message: "Product added to cart",
          cart,
        },
        { status: 201 },
      );
    }

    // Check whether product already exists
    const existingItem = cart.items.find(
      (item: any) => item.product.toString() === productId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > stock) {
        return NextResponse.json(
          {
            success: false,
            message: `Only ${stock} items available`,
          },
          { status: 400 },
        );
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: new mongoose.Types.ObjectId(productId),
        quantity,
      });
    }

    await cart.save();

    await cart.populate("items.product");

    return NextResponse.json(
      {
        success: true,
        message: "Product added to cart",
        cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Add to cart error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

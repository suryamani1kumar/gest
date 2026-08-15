import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Wishlist from "@/models/Wishlist";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Added by your middleware after JWT verification
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    // Check product exists
    const product = await Product.findById(productId).select("_id");

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    // Find wishlist
    let wishlist = await Wishlist.findOne({
      user: userId,
    });

    // Create wishlist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        customer: userId,
        products: [productId],
      });

      return NextResponse.json({
        success: true,
        message: "Added to wishlist",
        isWishlisted: true,
      });
    }

    // Check if already exists
    const productIndex = wishlist.products.findIndex(
      (id) => id.toString() === productId
    );

    if (productIndex !== -1) {
      // Remove
      wishlist.products.splice(productIndex, 1);

      await wishlist.save();

      return NextResponse.json({
        success: true,
        message: "Removed from wishlist",
        isWishlisted: false,
      });
    }

    // Add
    wishlist.products.push(product._id);

    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: "Added to wishlist",
      isWishlisted: true,
    });
  } catch (error) {
    console.error("Wishlist error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
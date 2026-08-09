import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

// GET All Products
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const productType = searchParams.get("productType");

    const filter: Record<string, any> = {};

    if (productType) {
      filter.productType = productType;
    }

    const products = await Product.find(filter)
      .select(
        "-astrology -benefits -careInstructions -seo -updatedAt -createdAt -description -__v",
      )
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        data: products,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const productIds = ids.split(",").filter(Boolean);

    const products = await Product.find({
      _id: { $in: productIds },
    }).lean();

    return NextResponse.json({
      success: true,
      data: products,
    });
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
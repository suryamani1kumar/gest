import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Gemstone from "@/models/Gemstone";

// GET All Gemstones
export async function GET() {
  try {
    await connectDB();

    const gemstones = await Gemstone.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: gemstones.length,
        data: gemstones,
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

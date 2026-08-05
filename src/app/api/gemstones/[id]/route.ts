import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Gemstone from "@/models/Gemstone";

// GET Single
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const gemstone = await Gemstone.findById(id);

    if (!gemstone) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemstone not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: gemstone,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
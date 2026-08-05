import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Rudraksha from "@/models/Rudraksha";

// GET Single
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const rudraksha = await Rudraksha.findById(id);

    if (!rudraksha) {
      return NextResponse.json(
        {
          success: false,
          message: "Rudraksha not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: rudraksha,
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

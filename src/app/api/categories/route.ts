import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Category from "@/models/Category";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const name = searchParams.get("name")?.trim() || "";
    const parentCategory = searchParams.get("parentCategory") || "";
    const parentOnly = searchParams.get("parentOnly") === "true";

    const query: Record<string, unknown> = {
      status: "Active",
    };

    // Search category by exact name
    if (name) {
      query.name = {
        $regex: `^${escapeRegex(name)}$`,
        $options: "i",
      };
    }
    // Search category by partial name
    else if (search) {
      query.name = {
        $regex: escapeRegex(search),
        $options: "i",
      };
    }

    // Only parent categories
    if (parentOnly) {
      query.parentCategory = null;
    }

    // Categories having a specific parent
    else if (parentCategory === "none") {
      query.parentCategory = null;
    } else if (parentCategory) {
      if (!mongoose.isValidObjectId(parentCategory)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid parent category ID.",
          },
          { status: 400 },
        );
      }

      query.parentCategory = new mongoose.Types.ObjectId(parentCategory);
    }

    const categories = await Category.find(query)
      .populate("parentCategory", "name slug")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/categories error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories.",
      },
      { status: 500 },
    );
  }
}

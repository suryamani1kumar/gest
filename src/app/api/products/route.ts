import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

// GET All Products

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const productType = searchParams.get("productType")?.trim();
    const category = searchParams.get("category")?.trim();
    const name = searchParams.get("name")?.trim();
    const search = searchParams.get("search")?.trim();

    // Pagination
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 12, 1),
      100,
    );

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {
      status: "Published",
    };

    // Product Type
    if (productType) {
      filter.productType = productType;
    }

    // Category name -> Category ObjectId
    if (category) {
      const categoryData = await Category.findOne({
        slug: {
          $regex: `^${escapeRegex(category)}$`,
          $options: "i",
        },
      }).select("_id");

      if (!categoryData) {
        return NextResponse.json({
          success: true,
          count: 0,
          total: 0,
          page,
          limit,
          totalPages: 0,
          data: [],
        });
      }

      filter.category = categoryData._id;
    }

    // Exact product name
    if (name) {
      filter.name = {
        $regex: `^${escapeRegex(name)}$`,
        $options: "i",
      };
    }

    // General search
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: escapeRegex(search),
            $options: "i",
          },
        },
        {
          slug: {
            $regex: escapeRegex(search),
            $options: "i",
          },
        },
      ];
    }

    // Get total count
    const total = await Product.countDocuments(filter);

    // Get paginated products
    const products = await Product.find(filter)
      .select(
        "-astrology -benefits -careInstructions -seo -updatedAt -createdAt -description -__v",
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        data: products,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch products.",
      },
      { status: 500 },
    );
  }
}

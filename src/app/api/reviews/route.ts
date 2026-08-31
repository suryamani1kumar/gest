import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";
import Product from "@/models/Product";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      productId,
      rating: ratingValue,
      title,
      comment,
      images,
      customerId,
    } = body;

    // Product ID
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 },
      );
    }

    // customer ID
    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          message: "customer ID is required",
        },
        { status: 400 },
      );
    }
    // Rating
    if (ratingValue === undefined || ratingValue === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating is required",
        },
        { status: 400 },
      );
    }

    const rating = Number(ratingValue);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5",
        },
        { status: 400 },
      );
    }

    // Comment
    const reviewComment = comment?.toString().trim();

    if (!reviewComment || reviewComment.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Review must contain at least 5 characters",
        },
        { status: 400 },
      );
    }

    // Check product
    const product = await Product.findById(productId).select("_id");

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    // Validate images
    let reviewImages: {
      url: string;
      publicId?: string;
    }[] = [];

    if (images !== undefined) {
      if (!Array.isArray(images)) {
        return NextResponse.json(
          {
            success: false,
            message: "Images must be an array",
          },
          { status: 400 },
        );
      }

      if (images.length > 5) {
        return NextResponse.json(
          {
            success: false,
            message: "Maximum 5 images are allowed",
          },
          { status: 400 },
        );
      }

      for (const image of images) {
        if (!image || typeof image !== "object") {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid image object",
            },
            { status: 400 },
          );
        }

        if (!image.url || typeof image.url !== "string") {
          return NextResponse.json(
            {
              success: false,
              message: "Image URL is required",
            },
            { status: 400 },
          );
        }

        reviewImages.push({
          url: image.url,
          publicId:
            typeof image.publicId === "string" ? image.publicId : undefined,
        });
      }
    }

    // Create review
    const review = await Review.create({
      product: productId,
      customer: customerId,
      rating,
      title: title?.toString().trim() || undefined,
      comment: reviewComment,
      images: reviewImages,
      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully",
        review,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create review error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit review",
      },
      { status: 500 },
    );
  }
}

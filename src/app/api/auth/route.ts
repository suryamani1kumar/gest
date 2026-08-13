import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifySession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get token from HTTP-only cookie
    const token = req.cookies.get("s_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "Not logged in",
        },
        { status: 401 },
      );
    }

    // Verify JWT
    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "Invalid or expired token",
        },
        { status: 401 },
      );
    }

    // Connect DB
    await connectDB();

    // Find user
    const user = await User.findById(session.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "Customer not found",
        },
        { status: 401 },
      );
    }

    if (user.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "Customer account is not active",
        },
        { status: 403 },
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      customer: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Auth Me Error:", error);

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        message: "Authentication failed",
      },
      { status: 401 },
    );
  }
}
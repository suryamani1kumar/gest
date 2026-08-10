import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Customer from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      email,
      firstName,
      lastName,
      phone,
    } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    if (!firstName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required",
        },
        { status: 400 },
      );
    }

    if (!lastName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Last name is required",
        },
        { status: 400 },
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 },
      );
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const customer = await Customer.findOne({
      email: normalizedEmail,
      emailVerified: true,
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please verify your email first",
        },
        { status: 403 },
      );
    }

    if (customer.status === "blocked") {
      return NextResponse.json(
        {
          success: false,
          message: "This account has been blocked",
        },
        { status: 403 },
      );
    }

    if (customer.status === "active") {
      return NextResponse.json(
        {
          success: false,
          message: "Account is already registered",
        },
        { status: 409 },
      );
    }

    customer.firstName =
      firstName.trim();

    customer.lastName =
      lastName.trim();

    customer.phone =
      phone.trim();

    customer.status = "active";

    customer.lastLogin = new Date();

    await customer.save();

    // TODO:
    // Create session/JWT here

    return NextResponse.json(
      {
        success: true,

        message:
          "Registration completed successfully",

        data: {
          id: customer._id,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          emailVerified:
            customer.emailVerified,
          status: customer.status,
        },

        nextStep: "authenticated",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(
      "REGISTER ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to complete registration",
      },
      { status: 500 },
    );
  }
}
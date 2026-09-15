import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Customer from "@/models/User";
import { verifySession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("s_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const session = await verifySession(token);

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 },
      );
    }

    const address = await Customer.findOne({ _id: session.userId }).select(
      "addresses",
    );

    return NextResponse.json({ success: true, data: address });
  } catch (error: any) {
    console.error("Fetch address error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch address" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      type,
      firstName,
      lastName,
      phone,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      postalCode,
      isDefault,
    } = body;

    const token = request.cookies.get("s_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const session = await verifySession(token);
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 },
      );
    }

    // Validate required fields
    if (!addressLine1 || !city || !state || !postalCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Address, city, state, country and postal code are required",
        },
        { status: 400 },
      );
    }

    // Find customer
    const customer = await Customer.findById(session?.userId);

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        { status: 404 },
      );
    }

    // Check existing addresses
    const addressCount = customer.addresses?.length || 0;

    // First address automatically becomes default
    const shouldBeDefault = addressCount === 0 ? true : Boolean(isDefault);

    // If this address is default,
    // remove default from existing addresses
    if (shouldBeDefault && customer.addresses?.length) {
      customer.addresses.forEach((address: any) => {
        address.isDefault = false;
      });
    }

    // Add new address
    customer.addresses.push({
      type: type,
      firstName,
      lastName,
      phone,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      postalCode,
      isDefault: shouldBeDefault,
    });

    await customer.save();

    // Get newly added address
    const newAddress = customer.addresses[customer.addresses.length - 1];

    return NextResponse.json(
      {
        success: true,
        message: "Address added successfully",
        data: newAddress,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Add address error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add address",
      },
      { status: 500 },
    );
  }
}

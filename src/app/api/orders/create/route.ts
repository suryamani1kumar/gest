import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { verifySession } from "@/lib/auth";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import Order from "@/models/Order";

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // 1. Authenticate
    const token = req.cookies.get("s_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please login to place an order" },
        { status: 401 },
      );
    }

    const session = await verifySession(token);
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session" },
        { status: 401 },
      );
    }

    const userId = session.userId;

    // 2. Parse and validate shipping address from request body
    const body = await req.json();
    const { shippingAddress } = body;

    if (
      !shippingAddress?.firstName ||
      !shippingAddress?.lastName ||
      !shippingAddress?.address ||
      !shippingAddress?.city ||
      !shippingAddress?.postalCode
    ) {
      return NextResponse.json(
        { success: false, message: "Complete shipping address is required" },
        { status: 400 },
      );
    }

    // 3. Fetch cart from DB with product data
    const cart = await Cart.findOne({ customer: userId }).populate({
      path: "items.product",
      model: Product,
      select: "name gallery pricing",
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Your cart is empty" },
        { status: 400 },
      );
    }

    // 4. Build order items and compute totals (prices from DB, not client)
    const orderItems = cart.items.map((item: any) => {
      const product = item.product;
      const price =
        product.pricing?.salePrice ||
        product.pricing?.sellingPrice ||
        0;
      const qty = item.quantity;
      const image =
        product.gallery?.[0]?.url || "";

      return {
        product: product._id,
        name: product.name,
        image,
        quantity: qty,
        price,
        subtotal: price * qty,
      };
    });

    const subtotal = orderItems.reduce(
      (acc: number, item: any) => acc + item.subtotal,
      0,
    );

    // GST is already baked into the price for jewellery; calculate as 3%
    const tax = Math.round(subtotal * 0.03 * 100) / 100;
    const shippingCharge = 0; // Free shipping
    const total = subtotal + tax + shippingCharge;

    // 5. Create the pending order in MongoDB
    const order = await Order.create({
      customer: userId,
      orderNumber: generateOrderNumber(),
      items: orderItems,
      shippingAddress: {
        firstName: shippingAddress.firstName.trim(),
        lastName: shippingAddress.lastName.trim(),
        address: shippingAddress.address.trim(),
        apartment: shippingAddress.apartment?.trim() || "",
        city: shippingAddress.city.trim(),
        postalCode: shippingAddress.postalCode.trim(),
        phone: shippingAddress.phone?.trim() || "",
      },
      paymentMethod: "UPI",
      paymentStatus: "pending",
      orderStatus: "pending",
      subtotal,
      shippingCharge,
      tax,
      discount: 0,
      total,
    });

    return NextResponse.json({
      success: true,
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      amount: total, // in INR
    });
  } catch (error: any) {
    console.error("Order create error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create order",
      },
      { status: 500 },
    );
  }
}

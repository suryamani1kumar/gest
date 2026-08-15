import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("s_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const session = await verifySession(token);

  if (!session?.userId) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired session",
      },
      { status: 401 }
    );
  }

  const requestHeaders = new Headers(req.headers);

  // Never trust a client-provided x-user-id
  requestHeaders.delete("x-user-id");

  // Set verified user ID
  requestHeaders.set("x-user-id", session.userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/api/cart/add",
    "/api/wishlist/add",
    "/api/orders/:path*",
  ],
};
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Script from "next/script";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { checkAuth } from "@/redux/slices/authSlice";
import { clearCart, fetchUserCart } from "@/redux/slices/cartSlice";
import Login from "@/components/Account/Login";
import { useRouter } from "next/navigation";

export {};

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProductDetail {
  _id: string;
  name: string;
  category?: string;
  gallery: { url: string }[];
  pricing?: {
    sellingPrice?: number;
    salePrice?: number;
  };
}

interface CartDisplayItem {
  productId: string;
  quantity: number;
  product: ProductDetail | null;
}

interface ShippingForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  phone: string;
  newsletter: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isAuthenticated, customer, loading: authLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // UI state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartDetails, setCartDetails] = useState<CartDisplayItem[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successOrderNumber, setSuccessOrderNumber] = useState("");
  const [formError, setFormError] = useState("");

  // Shipping form
  const [form, setForm] = useState<ShippingForm>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    newsletter: false,
  });

  // Pre-fill email from auth
  useEffect(() => {
    if (customer?.email) {
      setForm((prev) => ({ ...prev, email: customer.email }));
    }
  }, [customer]);

  // Ensure cart is loaded from server when user is authenticated but Redux cart
  // is still empty (e.g. navigated directly to /checkout without visiting /cart)
  useEffect(() => {
    if (isAuthenticated && cartItems.length === 0 && !authLoading) {
      dispatch(fetchUserCart());
    }
  }, [isAuthenticated, authLoading, cartItems.length, dispatch]);

  // Fetch product details for cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      setCartDetails([]);
      return;
    }

    const ids = cartItems.map((i) => i.productId).join(",");

    setFetchingProducts(true);
    fetch(`/api/cart?ids=${ids}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const productMap: Record<string, ProductDetail> = {};
          (data.data as ProductDetail[]).forEach((p) => {
            productMap[p._id] = p;
          });

          setCartDetails(
            cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              product: productMap[item.productId] || null,
            })),
          );
        }
      })
      .catch(console.error)
      .finally(() => setFetchingProducts(false));
  }, [cartItems]);

  // ── Computed totals ──────────────────────────────────────────────────────

  const subtotal = cartDetails.reduce((acc, item) => {
    const price =
      item.product?.pricing?.salePrice ||
      item.product?.pricing?.sellingPrice ||
      0;
    return acc + price * item.quantity;
  }, 0);

  const tax = Math.round(subtotal * 0.03 * 100) / 100;
  const total = subtotal + tax;

  // ── Form helpers ─────────────────────────────────────────────────────────

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    setFormError("");
    if (!form.email.trim()) {
      setFormError("Email address is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Please enter a valid email address.");
      return false;
    }
    if (!form.firstName.trim()) {
      setFormError("First name is required.");
      return false;
    }
    if (!form.lastName.trim()) {
      setFormError("Last name is required.");
      return false;
    }
    if (!form.address.trim()) {
      setFormError("Address is required.");
      return false;
    }
    if (!form.city.trim()) {
      setFormError("City is required.");
      return false;
    }
    if (!form.postalCode.trim()) {
      setFormError("Postal code is required.");
      return false;
    }
    if (cartDetails.length === 0) {
      setFormError("Your cart is empty.");
      return false;
    }
    return true;
  };

  // ── Payment flow ─────────────────────────────────────────────────────────

  const initiatePayment = useCallback(async () => {
    if (!validateForm()) return;

    setPaying(true);
    setFormError("");

    try {
      // Step 1: Create DB order
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          shippingAddress: {
            firstName: form.firstName,
            lastName: form.lastName,
            address: form.address,
            apartment: form.apartment,
            city: form.city,
            postalCode: form.postalCode,
            phone: form.phone,
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        setFormError(orderData.message || "Failed to create order.");
        setPaying(false);
        return;
      }

      const { orderId, amount } = orderData;

      // Step 2: Create Razorpay order
      const rzpRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, orderId }),
      });

      const rzpData = await rzpRes.json();

      if (!rzpData.success) {
        setFormError(rzpData.message || "Failed to initiate payment.");
        setPaying(false);
        return;
      }

      // Step 3: Open Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: rzpData.order.amount,
        currency: rzpData.order.currency,
        name: "Gemstones & Jewellery",
        description: `Order ${orderData.orderNumber}`,
        checkout_config_id: process.env.NEXT_PUBLIC_CHECKOUT_CONFIG_ID,
        order_id: rzpData.order.id,

        handler: async function (response: any) {
          // Step 4: Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              ...response,
              orderId,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // Clear Redux cart
            dispatch(clearCart());
            setPaymentSuccess(true);
            setSuccessOrderNumber(verifyData.orderNumber || orderData.orderNumber);

            // Redirect to account after 3 seconds
            setTimeout(() => router.push("/account"), 3000);
          } else {
            setFormError(
              verifyData.message || "Payment verification failed. Please contact support.",
            );
          }
          setPaying(false);
        },

        modal: {
          ondismiss: () => {
            setPaying(false);
          },
        },

        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#7A1F1F",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      setFormError("Something went wrong. Please try again.");
      setPaying(false);
    }
  }, [form, cartDetails, dispatch, router]);

  // ── Handle "Pay Now" click ───────────────────────────────────────────────

  const handlePayNow = () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      // Show login modal; payment will resume via onSuccess
      setShowLoginModal(true);
      return;
    }

    initiatePayment();
  };

  // Called by Login modal after successful auth (no page reload)
  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    // Re-check auth state in Redux
    await dispatch(checkAuth());
    // Then proceed with payment
    initiatePayment();
  };

  // ── Success screen ───────────────────────────────────────────────────────

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-serif text-[#1A1A1A] mb-3">
            Order Placed!
          </h1>
          <p className="text-gray-500 mb-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          {successOrderNumber && (
            <p className="text-sm font-medium text-[#7A1F1F] mb-6">
              Order #{successOrderNumber}
            </p>
          )}
          <p className="text-xs text-gray-400">
            Redirecting to your account...
          </p>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────

  return (
    <div className="pt-15 pb-24 bg-[#FFFDF8] min-h-screen">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Login Modal */}
      {showLoginModal && (
        <Login
          setAccountOpen={setShowLoginModal}
          onSuccess={handleLoginSuccess}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span
            className="cursor-pointer hover:text-[#7A1F1F] transition-colors"
            onClick={() => router.push("/cart")}
          >
            Cart
          </span>
          <span>›</span>
          <span className="text-[#7A1F1F]">Checkout</span>
        </nav>

        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* ── Left — Form ── */}
          <div className="lg:w-2/3 space-y-10">

            {/* Auth notice */}
            {!isAuthenticated && !authLoading && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1 text-sm text-amber-800">
                  <span>You are not logged in. </span>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="font-semibold underline hover:text-[#7A1F1F] cursor-pointer"
                  >
                    Login or create an account
                  </button>
                  <span> to complete your order.</span>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-serif text-[#1A1A1A] mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={handleFormChange}
                    className="w-4 h-4 text-[#7A1F1F] border-gray-300 focus:ring-[#7A1F1F] rounded"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm font-light text-[#6B7280]"
                  >
                    Email me with news and exclusive offers
                  </label>
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-serif text-[#1A1A1A] mb-6">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleFormChange}
                    placeholder="First name"
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleFormChange}
                    placeholder="Last name"
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleFormChange}
                    placeholder="Street address"
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={form.apartment}
                    onChange={handleFormChange}
                    placeholder="Apartment, suite, etc."
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleFormChange}
                    placeholder="City"
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleFormChange}
                    placeholder="Postal code"
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="Phone (optional)"
                    className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Form error */}
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                {formError}
              </div>
            )}

            {/* Pay Button */}
            <button
              type="button"
              disabled={paying || authLoading || fetchingProducts}
              onClick={handlePayNow}
              className="w-full bg-[#7A1F1F] text-white p-5 uppercase tracking-widest text-sm font-medium hover:bg-[#B8860B] transition-colors mt-2 rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {paying ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Processing…
                </>
              ) : (
                `Pay ₹${total.toLocaleString("en-IN")}`
              )}
            </button>

            {/* Security note */}
            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-9a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
              Secured by Razorpay · 256-bit SSL Encryption
            </p>
          </div>

          {/* ── Right — Order Summary ── */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 border border-[#E5E7EB] sticky top-32 rounded-2xl shadow-sm">
              <h3 className="text-xl font-serif text-[#1A1A1A] mb-6">
                Order Summary
              </h3>

              {fetchingProducts ? (
                <div className="space-y-4 mb-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex gap-4 animate-pulse"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : cartDetails.length === 0 ? (
                <p className="text-sm text-gray-400 mb-6">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-6 border-b border-gray-200 pb-6 mb-6">
                  {cartDetails.map((item) => {
                    const price =
                      item.product?.pricing?.salePrice ||
                      item.product?.pricing?.sellingPrice ||
                      0;
                    const imageUrl =
                      item.product?.gallery?.[0]?.url || "";

                    return (
                      <div key={item.productId} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-white flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={item.product?.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                          <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.product?.name || "Product"}
                          </h4>
                          {item.product?.category && (
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                              {item.product.category}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center flex-shrink-0">
                          <span className="text-sm font-medium text-gray-900">
                            ₹{(price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="space-y-4 mb-6 text-sm font-light text-gray-600 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="uppercase text-xs tracking-wider text-green-600 font-medium">
                    Free
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (3%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-medium text-gray-900 mb-4">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              {/* Razorpay badge */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg
                  className="w-4 h-4 text-[#072654]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
                <span>Powered by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

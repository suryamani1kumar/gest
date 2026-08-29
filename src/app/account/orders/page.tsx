"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Package,
  Search,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────
type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface IOrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

interface IOrder {
  _id: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  paymentStatus: string;
  subtotal: number;
  tax: number;
  total: number;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  createdAt: string;
  razorpayPaymentId?: string;
}

// ── Filter tabs ────────────────────────────────────────────────
const FILTERS: { label: string; value: string }[] = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

// ── Status config ─────────────────────────────────────────────
const STATUS_CONFIG: Record<
  string,
  { cls: string; icon: React.ReactNode; label: string }
> = {
  pending: {
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Clock3 size={13} />,
    label: "Pending",
  },
  confirmed: {
    cls: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <CheckCircle2 size={13} />,
    label: "Confirmed",
  },
  processing: {
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Clock3 size={13} />,
    label: "Processing",
  },
  shipped: {
    cls: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: <Truck size={13} />,
    label: "Shipped",
  },
  delivered: {
    cls: "bg-green-50 text-green-700 border-green-200",
    icon: <CheckCircle2 size={13} />,
    label: "Delivered",
  },
  cancelled: {
    cls: "bg-red-50 text-red-700 border-red-200",
    icon: <XCircle size={13} />,
    label: "Cancelled",
  },
};

// ── Expanded order detail modal ────────────────────────────────
const OrderDetailModal = ({
  order,
  onClose,
}: {
  order: IOrder;
  onClose: () => void;
}) => {
  const status = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.pending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#B8860B]">
              Order Details
            </p>
            <h2 className="mt-1 text-base font-semibold text-[#1A1A1A]">
              {order.orderNumber}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-[#7A1F1F] transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status + Date */}
          <div className="flex items-center justify-between">
            <span
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${status.cls}`}
            >
              {status.icon}
              {status.label}
            </span>
            <p className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Items */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Items Ordered
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-14 w-14 flex-shrink-0 rounded-xl border border-[#E8E3D9] bg-[#FAF9F6] overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package size={20} className="text-[#B8860B]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1A1A1A] truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} × ₹
                      {item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#1A1A1A] flex-shrink-0">
                    ₹{item.subtotal.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-xl bg-[#FAF9F6] border border-gray-100 p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>GST (3%)</span>
              <span>₹{order.tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-[#1A1A1A] border-t border-gray-200 pt-2 mt-2">
              <span>Total</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Shipping Address
            </h3>
            <div className="rounded-xl bg-[#FAF9F6] border border-gray-100 p-4 text-sm text-gray-700">
              <p className="font-semibold">
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>
              <p className="mt-1">{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          {order.razorpayPaymentId && (
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Payment
              </h3>
              <div className="rounded-xl bg-[#FAF9F6] border border-gray-100 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Payment ID</span>
                  <span className="font-mono text-xs text-gray-700">
                    {order.razorpayPaymentId}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500">Status</span>
                  <span className="font-semibold text-green-600 capitalize">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Order Card ─────────────────────────────────────────────────
const OrderCard = ({
  order,
  onViewDetails,
}: {
  order: IOrder;
  onViewDetails: () => void;
}) => {
  const status = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.pending;
  const firstItem = order.items[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8E3D9] bg-white shadow-sm transition hover:shadow-md">
      {/* Order Header */}
      <div className="border-b border-gray-100 bg-[#FEFDFC] px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Order ID
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[#1A1A1A]">
                {order.orderNumber}
              </p>
            </div>
            <div className="hidden h-7 w-px bg-gray-200 sm:block" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Order Date
              </p>
              <p className="mt-0.5 text-sm font-medium text-gray-600">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="hidden h-7 w-px bg-gray-200 sm:block" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Items
              </p>
              <p className="mt-0.5 text-sm font-medium text-gray-600">
                {order.items.reduce((a, i) => a + i.quantity, 0)}
              </p>
            </div>
          </div>
          {/* Status badge */}
          <span
            className={`flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${status.cls}`}
          >
            {status.icon}
            {status.label}
          </span>
        </div>
      </div>

      {/* Product preview */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Image */}
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#E8E3D9] bg-[#FAF9F6] flex items-center justify-center">
            {firstItem?.image ? (
              <img
                src={firstItem.image}
                alt={firstItem.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Package size={30} strokeWidth={1.4} className="text-[#B8860B]" />
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B8860B]">
              {order.items.length > 1
                ? `${order.items.length} items`
                : "Gemstone"}
            </p>
            <h2 className="truncate text-base font-semibold text-[#1A1A1A]">
              {firstItem?.name || "Order"}
              {order.items.length > 1 &&
                ` + ${order.items.length - 1} more item${order.items.length > 2 ? "s" : ""}`}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {firstItem ? `Qty: ${firstItem.quantity}` : ""}
            </p>
          </div>

          {/* Price */}
          <div className="sm:text-right flex-shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Total
            </p>
            <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">
              ₹{order.total.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">
              {order.paymentStatus}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {order.orderStatus === "delivered" ? (
              <>
                <CheckCircle2 size={15} className="text-green-600" />
                <span>Delivered successfully</span>
              </>
            ) : order.orderStatus === "shipped" ? (
              <>
                <Truck size={15} className="text-indigo-600" />
                <span>Your order is on the way</span>
              </>
            ) : order.orderStatus === "cancelled" ? (
              <>
                <XCircle size={15} className="text-red-500" />
                <span>Order cancelled</span>
              </>
            ) : (
              <>
                <Clock3 size={15} className="text-[#B8860B]" />
                <span>Preparing your order</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onViewDetails}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E0D7] px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#7A1F1F] hover:text-[#7A1F1F] cursor-pointer"
            >
              <Eye size={14} />
              View Details
            </button>

            {order.orderStatus === "shipped" && (
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#7A1F1F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#5A1717]">
                <Truck size={14} />
                Track Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────
const OrderPage = () => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch orders from DB
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    fetch("/api/orders/user", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  // Filtered + searched orders
  const filteredOrders = useMemo(() => {
    let result = orders;

    if (activeFilter !== "all") {
      result = result.filter((o) => o.orderStatus === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.items.some((item) => item.name.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [orders, activeFilter, searchQuery]);

  // Filter counts
  const countByStatus = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    orders.forEach((o) => {
      counts[o.orderStatus] = (counts[o.orderStatus] || 0) + 1;
    });
    return counts;
  }, [orders]);

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/account">
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#7A1F1F] transition cursor-pointer">
                <ArrowLeft size={14} />
                Account
              </button>
            </Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-xs font-semibold text-[#B8860B]">
              My Orders
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
                My Orders
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                View and track all your gemstone and jewellery purchases.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order ID or product…"
                className="h-10 w-full rounded-lg border border-[#E5E0D7] bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#B8860B]"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto border-b border-[#E8E3D9] pb-0">
          {FILTERS.map((f) => {
            const count = countByStatus[f.value] || 0;
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`shrink-0 cursor-pointer border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? "border-[#7A1F1F] text-[#7A1F1F]"
                    : "border-transparent text-gray-400 hover:text-[#7A1F1F]"
                }`}
              >
                {f.label}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-[#7A1F1F] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-[#E8E3D9] bg-white p-6"
              >
                <div className="flex gap-4">
                  <div className="h-24 w-24 rounded-xl bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-[#E8E3D9] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF4E8] text-[#B8860B]">
              <Package size={28} />
            </div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">
              {searchQuery
                ? "No orders match your search"
                : activeFilter !== "all"
                  ? `No ${activeFilter} orders`
                  : "No orders yet"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {searchQuery
                ? "Try a different search term or order ID."
                : "Explore our collection of natural gemstones and jewellery."}
            </p>
            {!searchQuery && (
              <Link href="/collections">
                <button className="mt-6 rounded-lg bg-[#7A1F1F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#5A1717]">
                  Start Shopping
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onViewDetails={() => setSelectedOrder(order)}
              />
            ))}
          </div>
        )}

        {/* Summary */}
        {!loading && filteredOrders.length > 0 && (
          <p className="mt-6 text-center text-xs text-gray-400">
            Showing {filteredOrders.length} of {orders.length} order
            {orders.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </main>
  );
};

export default OrderPage;
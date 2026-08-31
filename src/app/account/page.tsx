"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import SideNav from "@/components/Sidenav/SideNav";

interface IOrder {
  _id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  total: number;
  items: { name: string; image: string; quantity: number; price: number }[];
  createdAt: string;
}

const Account = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    customer,
    isAuthenticated,
    loading: authLoading,
  } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist?.items ?? [],
  );

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // Redirect to home if not authenticated (after auth resolves)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch real orders
  useEffect(() => {
    if (!isAuthenticated) return;
    setOrdersLoading(true);
    fetch("/api/orders/user", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      })
      .catch(console.error)
      .finally(() => setOrdersLoading(false));
  }, [isAuthenticated]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await dispatch(logout());
    router.push("/");
  };

  // Derived stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "pending" || o.orderStatus === "processing",
  ).length;
  const recentOrders = orders.slice(0, 3);

  const fullName = customer
    ? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim() ||
      "Customer"
    : "Customer";

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = customer
    ? new Date((customer as any).createdAt || Date.now()).toLocaleDateString(
        "en-IN",
        { month: "long", year: "numeric" },
      )
    : "";

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Welcome back, {customer?.firstName || "Customer"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your orders, profile, wishlist and account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <SideNav />

          {/* Main Content */}
          <section className="space-y-6">
            {/* Profile Card */}
            <div className="rounded-2xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7A1F1F] text-xl font-semibold text-white">
                    {initials || "C"}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">
                      {fullName}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {customer?.email}
                    </p>
                    {memberSince && (
                      <p className="mt-1 text-xs text-gray-400">
                        Member since {memberSince}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <AccountStat
                icon={<ShoppingBag size={20} />}
                label="Total Orders"
                value={ordersLoading ? "…" : String(totalOrders)}
              />
              <AccountStat
                icon={<Clock3 size={20} />}
                label="Pending Orders"
                value={ordersLoading ? "…" : String(pendingOrders)}
              />
              <AccountStat
                icon={<Heart size={20} />}
                label="Wishlist Items"
                value={String(wishlistItems.length)}
              />
            </div>

            {/* Recent Orders */}
            <div className="rounded-2xl border border-[#E8E3D9] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h2 className="text-base font-semibold text-[#1A1A1A]">
                    Recent Orders
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Track and manage your recent purchases.
                  </p>
                </div>
                <Link href="/account/orders">
                  <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#7A1F1F] hover:underline">
                    View All
                    <ChevronRight size={14} />
                  </button>
                </Link>
              </div>

              {ordersLoading ? (
                <div className="space-y-4 p-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse flex gap-4">
                      <div className="h-14 w-14 rounded-xl bg-gray-100 flex-shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                        <div className="h-3 bg-gray-100 rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="flex min-h-[180px] flex-col items-center justify-center px-6 py-10 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF4E8] text-[#B8860B]">
                    <Package size={24} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1A1A1A]">
                    No orders yet
                  </h3>
                  <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">
                    Your recent gemstone and jewellery purchases will appear
                    here.
                  </p>
                  <Link href="/collections">
                    <button className="mt-5 rounded-lg bg-[#7A1F1F] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#5A1717]">
                      Start Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center gap-4 px-6 py-4"
                    >
                      {/* Image */}
                      <div className="h-14 w-14 flex-shrink-0 rounded-xl border border-[#E8E3D9] bg-[#FAF9F6] flex items-center justify-center overflow-hidden">
                        {order.items[0]?.image ? (
                          <img
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package size={20} className="text-[#B8860B]" />
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1A1A1A] truncate">
                          {order.items[0]?.name || "Order"}
                          {order.items.length > 1 &&
                            ` +${order.items.length - 1} more`}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {order.orderNumber} •{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </p>
                      </div>
                      {/* Status + Price */}
                      <div className="text-right flex-shrink-0">
                        <OrderStatusBadge status={order.orderStatus} />
                        <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">
                          ₹{order.total.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account Information */}
            <div className="rounded-2xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-[#1A1A1A]">
                  Account Information
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Your personal account details.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InfoItem label="Full Name" value={fullName} />
                <InfoItem
                  label="Email Address"
                  value={customer?.email || "—"}
                />
                <InfoItem
                  label="Phone Number"
                  value={customer?.phone || "Not added"}
                />
                <InfoItem label="Account Status" value="Active" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

/* ── Small Status Badge ──────────────────────────────────────── */
const OrderStatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    pending: {
      cls: "bg-amber-50 text-amber-700 border-amber-100",
      icon: <Clock3 size={11} />,
    },
    confirmed: {
      cls: "bg-blue-50 text-blue-700 border-blue-100",
      icon: <CheckCircle2 size={11} />,
    },
    processing: {
      cls: "bg-amber-50 text-amber-700 border-amber-100",
      icon: <Clock3 size={11} />,
    },
    shipped: {
      cls: "bg-blue-50 text-blue-700 border-blue-100",
      icon: <Truck size={11} />,
    },
    delivered: {
      cls: "bg-green-50 text-green-700 border-green-100",
      icon: <CheckCircle2 size={11} />,
    },
    cancelled: {
      cls: "bg-red-50 text-red-700 border-red-100",
      icon: <XCircle size={11} />,
    },
  };
  const style = map[status] || map.pending;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${style.cls}`}
    >
      {style.icon}
      {status}
    </span>
  );
};

/* ── Stat Card ───────────────────────────────────────────────── */
const AccountStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-[#E8E3D9] bg-white p-5 shadow-sm">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF4E8] text-[#B8860B]">
      {icon}
    </div>
    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-2xl font-semibold text-[#1A1A1A]">{value}</p>
  </div>
);

/* ── Info Item ───────────────────────────────────────────────── */
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-gray-100 bg-[#FAF9F6] px-4 py-3">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-[#1A1A1A]">{value}</p>
  </div>
);

export default Account;

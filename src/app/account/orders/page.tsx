"use client";

import React from "react";
import {
  Package,
  Search,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
  RotateCcw,
} from "lucide-react";

const OrderPage = () => {
  const orders = [
    {
      id: "ORD-202608-00125",
      date: "Aug 10, 2026",
      status: "Delivered",
      statusType: "delivered",
      product: "Natural Ruby Gemstone",
      details: "2.45 Carat • Burma (Myanmar)",
      quantity: 1,
      price: "₹48,500",
      image: "/images/products/ruby.jpg",
    },
    {
      id: "ORD-202608-00118",
      date: "Aug 07, 2026",
      status: "Shipped",
      statusType: "shipped",
      product: "Blue Sapphire",
      details: "3.10 Carat • Ceylon (Sri Lanka)",
      quantity: 1,
      price: "₹32,000",
      image: "/images/products/sapphire.jpg",
    },
    {
      id: "ORD-202607-00094",
      date: "Jul 28, 2026",
      status: "Processing",
      statusType: "processing",
      product: "Emerald Gemstone",
      details: "2.20 Carat • Colombia",
      quantity: 1,
      price: "₹27,500",
      image: "/images/products/emerald.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B8860B]">
            My Account
          </p>

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
                placeholder="Search orders..."
                className="h-10 w-full rounded-lg border border-[#E5E0D7] bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#B8860B]"
              />
            </div>
          </div>
        </div>

        {/* Order Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-[#E8E3D9]">
          <OrderFilter label="All Orders" active />
          <OrderFilter label="Processing" />
          <OrderFilter label="Shipped" />
          <OrderFilter label="Delivered" />
          <OrderFilter label="Cancelled" />
        </div>

        {/* Orders */}
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="rounded-2xl border border-[#E8E3D9] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF4E8] text-[#B8860B]">
              <Package size={28} />
            </div>

            <h2 className="text-lg font-semibold text-[#1A1A1A]">
              No orders found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              You haven't placed any orders yet. Explore our collection of
              natural gemstones and jewellery.
            </p>

            <button className="mt-6 rounded-lg bg-[#7A1F1F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#5A1717]">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

/* --------------------------------------------------
   Order Card
-------------------------------------------------- */

const OrderCard = ({
  order,
}: {
  order: {
    id: string;
    date: string;
    status: string;
    statusType: string;
    product: string;
    details: string;
    quantity: number;
    price: string;
    image: string;
  };
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8E3D9] bg-white shadow-sm">
      {/* Order Header */}
      <div className="border-b border-gray-100 bg-[#FEFDFC] px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Order ID
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[#1A1A1A]">
                {order.id}
              </p>
            </div>

            <div className="hidden h-7 w-px bg-gray-200 sm:block" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Order Date
              </p>

              <p className="mt-0.5 text-sm font-medium text-gray-600">
                {order.date}
              </p>
            </div>
          </div>

          <OrderStatus
            status={order.status}
            statusType={order.statusType}
          />
        </div>
      </div>

      {/* Product */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Product Image */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E8E3D9] bg-[#FAF9F6]">
            <div className="flex h-full w-full items-center justify-center text-[#B8860B]">
              <Package size={30} strokeWidth={1.4} />
            </div>

            {/* If using Next Image:
            
            <Image
              src={order.image}
              alt={order.product}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
            
            */}
          </div>

          {/* Product Information */}
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B8860B]">
              Gemstone
            </p>

            <h2 className="truncate text-base font-semibold text-[#1A1A1A]">
              {order.product}
            </h2>

            <p className="mt-1 text-sm text-gray-500">{order.details}</p>

            <p className="mt-2 text-xs text-gray-400">
              Quantity: {order.quantity}
            </p>
          </div>

          {/* Price */}
          <div className="sm:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Total
            </p>

            <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">
              {order.price}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {order.statusType === "delivered" ? (
              <>
                <CheckCircle2 size={15} className="text-green-600" />
                <span>Delivered successfully</span>
              </>
            ) : order.statusType === "shipped" ? (
              <>
                <Truck size={15} className="text-blue-600" />
                <span>Your order is on the way</span>
              </>
            ) : (
              <>
                <Clock3 size={15} className="text-[#B8860B]" />
                <span>Preparing your order</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E0D7] px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#7A1F1F] hover:text-[#7A1F1F]">
              <Eye size={14} />
              View Details
            </button>

            {order.statusType === "delivered" && (
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#7A1F1F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#5A1717]">
                <RotateCcw size={14} />
                Buy Again
              </button>
            )}

            {order.statusType === "shipped" && (
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

/* --------------------------------------------------
   Filter
-------------------------------------------------- */

const OrderFilter = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => {
  return (
    <button
      className={`shrink-0 cursor-pointer border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${
        active
          ? "border-[#7A1F1F] text-[#7A1F1F]"
          : "border-transparent text-gray-400 hover:text-[#7A1F1F]"
      }`}
    >
      {label}
    </button>
  );
};

/* --------------------------------------------------
   Status
-------------------------------------------------- */

const OrderStatus = ({
  status,
  statusType,
}: {
  status: string;
  statusType: string;
}) => {
  const statusStyles = {
    delivered: {
      wrapper: "bg-green-50 text-green-700 border-green-100",
      icon: <CheckCircle2 size={14} />,
    },
    shipped: {
      wrapper: "bg-blue-50 text-blue-700 border-blue-100",
      icon: <Truck size={14} />,
    },
    processing: {
      wrapper: "bg-amber-50 text-amber-700 border-amber-100",
      icon: <Clock3 size={14} />,
    },
    cancelled: {
      wrapper: "bg-red-50 text-red-700 border-red-100",
      icon: <XCircle size={14} />,
    },
  };

  const style =
    statusStyles[statusType as keyof typeof statusStyles] ||
    statusStyles.processing;

  return (
    <span
      className={`flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${style.wrapper}`}
    >
      {style.icon}
      {status}
    </span>
  );
};

export default OrderPage;
"use client";

import React from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Clock3,
} from "lucide-react";
import Link from "next/link";

const Account = () => {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Welcome back, Customer
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your orders, profile, wishlist and account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#E8E3D9] bg-white p-3 shadow-sm">
            <nav className="space-y-1">
              <AccountMenuItem
                icon={<User size={18} />}
                label="Account Overview"
                active
              />

              <AccountMenuItem icon={<Package size={18} />} label="My Orders" />

              <AccountMenuItem icon={<Heart size={18} />} label="Wishlist" />

              <AccountMenuItem icon={<MapPin size={18} />} label="Addresses" />

              <AccountMenuItem
                icon={<Settings size={18} />}
                label="Account Settings"
              />

              <div className="my-3 border-t border-gray-100" />

              <button className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="space-y-6">
            {/* Profile Card */}
            <div className="rounded-2xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7A1F1F] text-xl font-semibold text-white">
                    C
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">
                      Customer Name
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      customer@example.com
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Member since August 2026
                    </p>
                  </div>
                </div>

                <button className="w-fit rounded-lg border border-[#7A1F1F] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#7A1F1F] transition hover:bg-[#7A1F1F] hover:text-white">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <AccountStat
                icon={<ShoppingBag size={20} />}
                label="Total Orders"
                value="0"
              />

              <AccountStat
                icon={<Clock3 size={20} />}
                label="Pending Orders"
                value="0"
              />

              <AccountStat
                icon={<Heart size={20} />}
                label="Wishlist Items"
                value="0"
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
                <Link href={"/account/orders"}>
                  <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#7A1F1F] hover:underline">
                    View All
                    <ChevronRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="flex min-h-[180px] flex-col items-center justify-center px-6 py-10 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF4E8] text-[#B8860B]">
                  <Package size={24} />
                </div>

                <h3 className="text-sm font-semibold text-[#1A1A1A]">
                  No orders yet
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">
                  Your recent gemstone and jewellery purchases will appear here.
                </p>

                <button className="mt-5 rounded-lg bg-[#7A1F1F] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#5A1717]">
                  Start Shopping
                </button>
              </div>
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
                <InfoItem label="Full Name" value="Customer Name" />

                <InfoItem label="Email Address" value="customer@example.com" />

                <InfoItem label="Phone Number" value="+91 XXXXX XXXXX" />

                <InfoItem label="Default Address" value="No address added" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const AccountMenuItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => {
  return (
    <button
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-[#7A1F1F] text-white shadow-sm"
          : "text-gray-600 hover:bg-[#FAF9F6] hover:text-[#7A1F1F]"
      }`}
    >
      {icon}
      <span>{label}</span>

      {active && <ChevronRight size={15} className="ml-auto" />}
    </button>
  );
};

const AccountStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
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
};

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-[#FAF9F6] px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-[#1A1A1A]">{value}</p>
    </div>
  );
};

export default Account;

"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineUser,
} from "react-icons/hi2";

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E8E0D0] bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-[68px] max-w-md items-center justify-around px-2">
        <NavItem
          href="/"
          icon={<HiOutlineHome size={22} />}
          label="Home"
        />

        <NavItem
          href="/categories"
          icon={<HiOutlineSquares2X2 size={20} />}
          label="Categories"
        />

        <NavItem
          href="/cart"
          icon={<ShoppingBag size={23} />}
          label="Cart"
        />

        <NavItem
          href="/wishlist"
          icon={<HiOutlineHeart size={22} />}
          label="Wishlist"
        />

        <NavItem
          href="/account"
          icon={<HiOutlineUser size={22} />}
          label="Account"
        />
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-w-[58px] flex-col items-center justify-center gap-1 text-[#6B6255] transition-colors hover:text-[#B8860B]"
    >
      {icon}

      <span className="text-[10px] font-medium">
        {label}
      </span>
    </Link>
  );
}
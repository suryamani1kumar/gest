"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Gem,
  Diamond,
  Circle,
  Gift,
  Sparkles,
  ArrowUpRight,
  PhoneCall,
  MessageCircleMore,
} from "lucide-react";
import { Tfn1 } from "@/lib/data";
import { useRouter } from "next/navigation";
import Login from "../Account/Login";
import { FiLogIn } from "react-icons/fi";

/* ─────────────────────────────────────────
   Shared mobile nav data
───────────────────────────────────────── */
const mobileCategories = [
  {
    name: "All Jewellery",
    icon: <Sparkles size={18} />,
    href: "/collections/all",
    links: [
      "Necklaces",
      "Chains",
      "Pendants",
      "Bracelets",
      "Bangles",
      "Mangalsutra",
      "New Arrival",
      "Temple Jewellery",
    ],
  },
  {
    name: "Gold",
    icon: <Gem size={18} />,
    href: "/collections/gold",
    links: [
      "Gold Rings",
      "Gold Chains",
      "Gold Earrings",
      "Gold Pendants",
      "Gold Bangles",
      "Bridal Gold",
    ],
  },
  {
    name: "Diamond",
    icon: <Diamond size={18} />,
    href: "/collections/diamond",
    links: [
      "All Diamond",
      "Diamond Bangles",
      "Diamond Bracelets",
      "Diamond Earrings",
      "Diamond Rings",
      "Diamond Necklaces",
      "Diamond Pendants",
    ],
  },
  {
    name: "Earrings",
    icon: <Circle size={18} />,
    href: "/collections/earrings",
    links: ["Studs", "Hoops", "Jhumkas", "Drop Earrings", "Chandbalis"],
  },
  {
    name: "Rings",
    icon: <Circle size={18} />,
    href: "/collections/rings",
    links: [
      "Engagement Rings",
      "Wedding Bands",
      "Statement Rings",
      "Stackable Rings",
    ],
  },
  {
    name: "Daily Wear",
    icon: <Heart size={18} />,
    href: "/collections/daily-wear",
    links: [
      "Light Necklaces",
      "Simple Earrings",
      "Thin Bangles",
      "Delicate Rings",
    ],
  },
  {
    name: "Gemstone",
    icon: <Gem size={18} />,
    href: "/collections/gemstones",
    links: ["Ruby", "Emerald", "Sapphire", "Pearl", "Coral", "Turquoise"],
  },
  {
    name: "Wedding",
    icon: <Diamond size={18} />,
    href: "/collections/wedding",
    links: [
      "Bridal Necklace Sets",
      "Bridal Earrings",
      "Bridal Bangles",
      "Groom Rings",
      "Groom Chains",
    ],
  },
  {
    name: "Gifting",
    icon: <Gift size={18} />,
    href: "/collections/gifting",
    links: [
      "Birthday",
      "Anniversary",
      "Valentine's Day",
      "Festivals",
      "Under ₹5,000",
      "₹5,000–₹15,000",
    ],
  },
  {
    name: "More",
    icon: <Menu size={18} />,
    href: "#",
    links: [
      "Silver Jewellery",
      "Platinum Jewellery",
      "Coins & Bars",
      "Accessories",
    ],
  },
];

/* ─────────────────────────────────────────
   Accordion item
───────────────────────────────────────── */
function AccordionItem({
  cat,
  onClose,
}: {
  cat: (typeof mobileCategories)[0];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3 font-medium text-gray-800">
          <span className="text-[#7A1F1F]">{cat.icon}</span>
          {cat.name}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="bg-gray-50 px-5 pb-4 pt-1 grid grid-cols-2 gap-x-4 gap-y-2">
          {cat.links.map((link) => (
            <Link
              key={link}
              href={`${cat.href}/${link.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-[#B8860B] flex items-center gap-1 transition-colors py-0.5"
            >
              <ChevronRight size={11} className="text-gray-300" />
              {link}
            </Link>
          ))}
          <Link
            href={cat.href}
            onClick={onClose}
            className="col-span-2 mt-2 text-xs font-semibold text-[#7A1F1F] flex items-center gap-1 hover:underline"
          >
            View all {cat.name} <ArrowUpRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Mobile Modal Drawer
───────────────────────────────────────── */
function MobileMenuModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-full w-[85vw] max-w-[360px] bg-white z-[70] flex flex-col shadow-2xl"
        style={{ animation: "slideInLeft 0.25s ease-out forwards" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-xl font-bold text-[#7A1F1F] tracking-wide">
              Aura
            </p>
            <p className="text-xs text-gray-400">Fine Jewellery</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Accordion — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {mobileCategories.map((cat) => (
            <AccordionItem key={cat.name} cat={cat} onClose={onClose} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────
   Main Navbar
───────────────────────────────────────── */
export default function Navbar({
  accountOpen,
  setAccountOpen,
}: {
  accountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 md:h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#7A1F1F] tracking-wide">
                Aura
              </h1>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-full max-w-lg relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for gold necklace"
                className="w-full border rounded-lg py-2 pl-12 pr-24 outline-none focus:border-[#7A1F1F]"
              />
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-10 text-[#7A1F1F]">
            <button
              onClick={() => router.push("/wishlist")}
              className="cursor-pointer hover:text-[#B8860B] transition-colors"
            >
              <Heart size={22} />
            </button>
            <div
              className="relative "
              onMouseEnter={() => setShowAccountMenu(true)}
            >
              <button
                aria-label="Account"
                className="hover:text-[#B8860B] transition cursor-pointer"
              >
                <User size={22} />
              </button>

              {showAccountMenu && (
                <div className="absolute left-1/2 top-8 z-50 -translate-x-1/2 w-58 overflow-hidden rounded-lg bg-white shadow-2xl border border-gray-100">
                  <button
                    onClick={() => {
                      setAccountOpen(true);
                      setShowAccountMenu(false);
                    }}
                    className="flex w-full items-center cursor-pointer gap-4 p-4 text-left hover:bg-[#FFFDF8] transition"
                  >
                    <FiLogIn className="text-[#7A1F1F]" size={22} />

                    <p className="text-md font-serif text-gray-800">
                      Log in / Sign up
                    </p>
                  </button>

                  <Link
                    href="/account"
                    onClick={() => {
                      setShowAccountMenu(false);
                    }}
                    className="flex items-center gap-4 cursor-pointer px-4 pb-4 hover:bg-[#FFFDF8] transition"
                  >
                    <User className="text-[#7A1F1F]" size={22} />

                    <p className="text-md font-serif text-gray-800">Account</p>
                  </Link>
                </div>
              )}
            </div>

            <button
              className="relative cursor-pointer hover:text-[#B8860B] transition-colors"
              aria-label="Cart"
              onClick={() => router.push("/cart")}
            >
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-[#7A1F1F] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                0
              </span>
            </button>
            <Link
              href={`tel:${Tfn1}`}
              className="flex items-center gap-3 rounded-lg border border-[#7A1F1F] text-[#7A1F1F] hover:bg-[#7A1F1F] hover:text-white transition-all px-5 py-2"
            >
              <div className="flex items-center justify-center rounded-full bg-white/20">
                <PhoneCall size={18} />
              </div>

              <p className="text-base font-bold">{Tfn1}</p>
            </Link>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-3 text-[#7A1F1F]">
            <button
              aria-label="Account"
              className="hover:text-[#B8860B] transition cursor-pointer"
              onClick={() => {
                setAccountOpen(true);
              }}
            >
              <User size={22} />
            </button>
            <button
              onClick={() => router.push("/wishlist")}
              className="cursor-pointer hover:text-[#B8860B]"
            >
              <Heart size={22} />
            </button>
            <button className="relative hover:text-[#B8860B]" aria-label="Cart">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-[#7A1F1F] text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                0
              </span>
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="p-1.5 rounded-md hover:bg-[#FFFDF8] transition-colors text-gray-700"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search Row — visible only on mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search for gold necklace…"
              className="w-full border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#7A1F1F] bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Modal */}
      {mobileOpen && <MobileMenuModal onClose={() => setMobileOpen(false)} />}
      {accountOpen && <Login setAccountOpen={setAccountOpen} />}
    </>
  );
}

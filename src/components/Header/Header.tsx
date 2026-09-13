"use client";

import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import Navbar from "./TopNavbar";

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [showOffer, setShowOffer] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowOffer(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
      {/* Offer Bar */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showOffer ? "max-h-9 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex min-h-9 items-center justify-center bg-[#4a2f2f] px-4 text-center text-xs font-medium text-white sm:text-sm">
          <span>
            Extra <strong className="text-[#C9A227]">10% OFF</strong> on orders
            above ₹5000
            <span className="mx-2 text-white/50">|</span>
            <strong className="text-[#C9A227]">5% OFF</strong> on prepaid orders
          </span>
        </div>
      </div>

      {/* Navbar */}
      <Navbar accountOpen={accountOpen} setAccountOpen={setAccountOpen} />

      {/* Bottom Navigation */}
      <BottomNav />
    </header>
  );
}

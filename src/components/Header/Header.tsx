"use client";

import BottomNav from "./BottomNav";
import Navbar from "./TopNavbar";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      {/* Top Header */}
      <Navbar />

      {/* Bottom Navigation */}
      <BottomNav />
    </header>
  );
}

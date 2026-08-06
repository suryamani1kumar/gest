"use client";

import { useState } from "react";
import BottomNav from "./BottomNav";
import Navbar from "./TopNavbar";

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      {/* Top Header */}
      <Navbar accountOpen={accountOpen} setAccountOpen={setAccountOpen} />

      {/* Bottom Navigation */}
      <BottomNav />
    </header>
  );
}

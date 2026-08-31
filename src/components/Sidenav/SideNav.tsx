import Link from "next/link";
import { User, Package, Heart, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState, AppDispatch } from "@/redux/store";

const SideNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    setLoggingOut(true);
    await dispatch(logout());
    router.push("/");
  };

  return (
    <aside className="h-fit rounded-2xl border border-[#E8E3D9] bg-white p-3 shadow-sm">
      <nav className="space-y-1">
        <Link href="/account">
          <button className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition bg-[#7A1F1F] text-white shadow-sm">
            <User size={18} />
            <span>Account Overview</span>
            <ChevronRight size={15} className="ml-auto" />
          </button>
        </Link>

        <Link href="/account/orders">
          <button className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition text-gray-600 hover:bg-[#FAF9F6] hover:text-[#7A1F1F]">
            <Package size={18} />
            <span>My Orders</span>
          </button>
        </Link>

        <Link href="/wishlist">
          <button className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition text-gray-600 hover:bg-[#FAF9F6] hover:text-[#7A1F1F]">
            <Heart size={18} />
            <span>Wishlist</span>
          </button>
        </Link>

        <div className="my-3 border-t border-gray-100" />

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
          <LogOut size={18} />
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </nav>
    </aside>
  );
};

export default SideNav;

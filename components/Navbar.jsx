"use client";
import { useAuthStore } from "@/store/useAutjStore";
import { usePathname, useRouter } from "next/navigation";
import {
  Dumbbell,
  LayoutDashboard,
  Sparkles,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await logout();
    router.push("/signin");
  }

  return (
    <div className="bg-base-100 border-b border-base-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <Dumbbell />
          <h1 className="text-lg font-bold">FitTrack AI</h1>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => router.push("/dashboard")}
            className={`btn btn-ghost btn-sm ${
              pathname === "/dashboard" ? "bg-base-200" : ""
            }`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          <button
            onClick={() => router.push("/generateworkout")}
            className={`btn btn-ghost btn-sm ${
              pathname === "/generateworkout" ? "bg-base-200" : ""
            }`}
          >
            <Sparkles size={16} />
            AI
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-error btn-sm flex items-center gap-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <button
            onClick={() => {
              router.push("/dashboard");
              setOpen(false);
            }}
            className="btn btn-ghost w-full justify-start"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          <button
            onClick={() => {
              router.push("/generateworkout");
              setOpen(false);
            }}
            className="btn btn-ghost w-full justify-start"
          >
            <Sparkles size={16} />
            AI
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-error w-full justify-start"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
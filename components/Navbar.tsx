// // components/Navbar.tsx

"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, userDetails } = useUser();
  const [handleMenu, setHandleMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setUser(null);
      router.push("/login");
    }
  };
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        handleMenu &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setHandleMenu(false);
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleMenu]);

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        FitGen
      </Link>

      {user ? (
        <div className="flex gap-6 text-gray-800">
          <Link
            href="/dashboard"
            className={pathname === "/dashboard" ? "text-red-500" : ""}
          >
            Dashboard
          </Link>
          <Link
            href="/workout-plan"
            className={pathname === "/plan" ? "text-red-500" : ""}
          >
            Plan
          </Link>
          <Link
            href="/history"
            className={pathname === "/history" ? "text-red-500" : ""}
          >
            History
          </Link>
          <Link
            href="/progress"
            className={pathname === "/progress" ? "text-red-500" : ""}
          >
            Progress
          </Link>
        </div>
      ) : (
        <div className="hidden md:flex gap-6 text-gray-700">
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-blue-600">
            How It Works
          </a>
        </div>
      )}

      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setHandleMenu(!handleMenu)}
            className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
          >
            {userDetails?.name.toUpperCase()}
          </button>

          {handleMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md p-4 z-50 w-40">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 rounded"
              >
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-left w-full hover:bg-gray-100 rounded text-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className={`px-4 py-2 border rounded-md hover:bg-gray-100 ${
              pathname === "/login" ? "text-red-500" : ""
            }`}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

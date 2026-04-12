"use client";

import { useAuthStore } from "@/store/useAutjStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function ProtectedLayout({ children }) {
  const { authUser, isCheckingAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      router.replace("/signin");
    }
  }, [authUser, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!authUser) return null; // prevent flicker

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
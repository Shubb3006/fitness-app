"use client";

import { useAuthStore } from "@/store/useAutjStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const { authUser, isCheckingAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      router.replace("/"); // already logged in → go home
    }
    
  }, [authUser, isCheckingAuth]);
  console.log(isCheckingAuth);
  console.log(authUser);

  if (isCheckingAuth) return null; // global loader already showing

  return children;
}

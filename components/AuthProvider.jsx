"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAutjStore";
import { Loader2 } from "lucide-react";

export default function AuthProvider({ children }) {
  const { checkAuth,checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if(checkingAuth) return <Loader2 className="animate-spin"/>

  return children;
}
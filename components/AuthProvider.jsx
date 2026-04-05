"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAutjStore";

export default function AuthProvider({ children }) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return children;
}
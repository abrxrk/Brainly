"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthProvider({ children }) {
  useEffect(() => {
    // Zustand persist middleware will restore automatically
    // This just ensures hydration completes
  }, []);

  return children;
}

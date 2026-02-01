"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ className = "" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
    </button>
  );
}

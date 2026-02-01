"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  type = "text",
  label,
  error,
  className = "",
  showPasswordToggle = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-[var(--fg)]">{label}</label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={`w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-muted focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[var(--fg)] transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

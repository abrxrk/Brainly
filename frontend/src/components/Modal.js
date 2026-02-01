"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`surface ring-soft relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto rounded-3xl p-6`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-[var(--fg)] transition"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

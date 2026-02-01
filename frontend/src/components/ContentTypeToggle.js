"use client";

import { useState } from "react";
import { CONTENT_TYPES } from "@/lib/api";

export default function ContentTypeToggle({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--fg)]">Type</label>
      <div className="grid grid-cols-4 gap-2">
        {CONTENT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium capitalize transition ${
              value === type
                ? "bg-white text-zinc-900"
                : "surface border border-white/10 text-muted hover:border-white/20 hover:text-[var(--fg)]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Input from "./Input";

export default function TagInput({ tags, onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !tags.includes(tag)) {
        onChange([...tags, tag]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--fg)]">Tags</label>
      <div className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 focus-within:border-white/20 focus-within:ring-2 focus-within:ring-white/10">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-muted hover:text-[var(--fg)]"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "Add tags..." : ""}
            className="flex-1 min-w-[120px] bg-transparent text-sm text-[var(--fg)] placeholder:text-muted focus:outline-none"
          />
        </div>
      </div>
      <p className="text-xs text-muted">Press Enter or comma to add tags</p>
    </div>
  );
}

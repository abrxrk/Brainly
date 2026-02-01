"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "./Modal";
import Button from "./Button";

export default function ShareModal({ isOpen, onClose, shareLink }) {
  const [copied, setCopied] = useState(false);

  if (!shareLink) return null;

  const fullUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareLink}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Brain">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted mb-4">Here is your share link:</p>
          <div className="surface ring-soft rounded-2xl p-4 flex items-center justify-between gap-3">
            <code className="text-sm text-zinc-300 truncate">{fullUrl}</code>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 text-muted hover:text-[var(--fg)] transition"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        <p className="text-xs text-muted">
          Share this link with others to let them view your collected content.
        </p>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button type="button" onClick={handleCopy} className="flex-1">
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

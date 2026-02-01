"use client";

import { X, ExternalLink } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { FileText, Image as ImageIcon, Music, Video } from "lucide-react";
import { formatDate } from "@/lib/utils";

const iconMap = {
  article: FileText,
  image: ImageIcon,
  video: Video,
  audio: Music,
};

export default function ContentPreviewModal({
  isOpen,
  onClose,
  content,
  onEdit,
}) {
  if (!content) return null;

  const Icon = iconMap[content.type] || FileText;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Content Preview">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Icon size={20} className="text-zinc-200" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{content.title}</h2>
              <p className="text-xs text-muted">
                {formatDate(content.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Media Preview */}
        {content.media && content.type === "image" && (
          <div className="rounded-xl overflow-hidden">
            <img
              src={content.media}
              alt={content.title}
              className="w-full max-h-80 object-cover"
            />
          </div>
        )}

        {content.media && content.type === "video" && (
          <div className="rounded-xl overflow-hidden">
            <video
              src={content.media}
              controls
              className="w-full max-h-80 object-cover"
            />
          </div>
        )}

        {content.media && content.type === "audio" && (
          <div className="rounded-xl overflow-hidden">
            <audio src={content.media} controls className="w-full" />
          </div>
        )}

        {/* Link */}
        {content.link && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--fg)]">Link</label>
            <a
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 break-all"
            >
              <ExternalLink size={14} />
              {content.link}
            </a>
          </div>
        )}

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--fg)]">Tags</label>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-lg bg-white/10 px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--fg)]">Type</label>
          <p className="text-sm text-muted capitalize">{content.type}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

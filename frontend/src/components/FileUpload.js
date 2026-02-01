"use client";

import { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
} from "lucide-react";
import Button from "./Button";

const iconMap = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText,
};

export default function FileUpload({ onFileSelect, accept, maxSize = 10 }) {
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);

      if (file.type.startsWith("image/")) setFileType("image");
      else if (file.type.startsWith("video/")) setFileType("video");
      else if (file.type.startsWith("audio/")) setFileType("audio");
      else setFileType("document");

      onFileSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setPreview(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onFileSelect(null);
  };

  if (preview) {
    const Icon = iconMap[fileType] || FileText;

    return (
      <div className="surface ring-soft relative rounded-2xl p-6">
        <button
          type="button"
          onClick={clearFile}
          className="absolute right-4 top-4 text-muted hover:text-[var(--fg)] transition"
        >
          <X size={18} />
        </button>

        {fileType === "image" ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl"
          />
        ) : (
          <div className="flex items-center justify-center h-48">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Icon size={28} className="text-zinc-200" />
                </div>
              </div>
              <p className="text-sm text-muted">File uploaded</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="surface ring-soft cursor-pointer rounded-2xl border-2 border-dashed border-white/10 p-12 text-center transition hover:border-white/20"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Upload size={28} className="text-zinc-200" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Click to upload file</p>
          <p className="text-xs text-muted mt-1">Max size: {maxSize}MB</p>
        </div>
      </div>
    </div>
  );
}

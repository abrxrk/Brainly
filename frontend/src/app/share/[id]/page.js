"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Brain,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
} from "lucide-react";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import BackButton from "@/components/BackButton";

const iconMap = {
  article: FileText,
  image: ImageIcon,
  video: Video,
  audio: Music,
};

export default function SharePage() {
  const params = useParams();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await api.getSharedContent(params.id);
        setContents(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSharedContent();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="surface ring-soft rounded-3xl p-12 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Share not found</h2>
          <p className="text-muted mb-6">{error}</p>
          <Link href="/" className="text-[var(--fg)] hover:underline">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  const username = contents[0]?.userId?.username || "Someone";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <BackButton />
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-900 shadow-sm">
              <Brain size={20} />
            </div>
            <div className="text-lg font-semibold tracking-tight">Brainly</div>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">{username}'s Brain</h1>
          <p className="text-sm text-muted mt-2">
            {contents.length} {contents.length === 1 ? "item" : "items"} shared
          </p>
        </div>

        {contents.length === 0 ? (
          <div className="surface ring-soft rounded-3xl p-16 text-center">
            <p className="text-muted">No content shared yet</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => {
              const Icon = iconMap[content.type] || FileText;
              return (
                <div
                  key={content._id}
                  className="surface surface-hover rounded-3xl p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 flex-shrink-0">
                      <Icon size={18} className="text-zinc-200" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium">{content.title}</h3>
                      <p className="text-xs text-muted mt-1">
                        {formatDate(content.createdAt)}
                      </p>
                    </div>
                  </div>

                  {content.media && content.type === "image" && (
                    <img
                      src={content.media}
                      alt={content.title}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                  )}

                  {content.link && (
                    <a
                      href={content.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted hover:text-[var(--fg)] transition"
                    >
                      <ExternalLink size={14} />
                      View link
                    </a>
                  )}

                  {content.tags && content.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {content.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-lg bg-white/10 px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Plus,
  LogOut,
  Share2,
  Trash2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useContentStore } from "@/store/useContentStore";
import Button from "@/components/Button";
import CreateContentModal from "@/components/CreateContentModal";
import ContentPreviewModal from "@/components/ContentPreviewModal";
import ShareModal from "@/components/ShareModal";
import { formatDate } from "@/lib/utils";

const iconMap = {
  article: FileText,
  image: ImageIcon,
  video: Video,
  audio: Music,
};

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hydrated = useAuthStore((state) => state.hydrated);
  const logout = useAuthStore((state) => state.logout);
  const {
    contents,
    loading,
    fetchContents,
    deleteContent,
    createShareLink,
    shareLink,
  } = useContentStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentShareLink, setCurrentShareLink] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (!hydrated) return; // Wait for store to hydrate
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    fetchContents();
  }, [hydrated, isAuthenticated, router, fetchContents]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this content?")) {
      try {
        await deleteContent(id);
        toast.success("Content deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete content. Please try again.");
      }
    }
  };

  const handleShare = async () => {
    try {
      const link = await createShareLink();
      setCurrentShareLink(link);
      setIsShareModalOpen(true);
      toast.success("Share link created!");
    } catch (err) {
      toast.error("Failed to create share link. Please try again.");
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (loading && contents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: "var(--navbar-border)",
          backgroundColor: "var(--navbar-bg)",
        }}
      >
        <div className="backdrop-blur mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-900 shadow-sm">
              <Brain size={20} />
            </div>
            <div className="text-lg font-semibold tracking-tight">Brainly</div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={handleShare}>
              <Share2 size={16} />
              Share
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Your Content</h1>
            <p className="text-sm text-muted mt-2">
              {contents.length} {contents.length === 1 ? "item" : "items"}{" "}
              captured
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={18} />
            Add Content
          </Button>
        </div>

        {contents.length === 0 ? (
          <div className="surface ring-soft rounded-3xl p-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
                <Brain size={32} className="text-zinc-200" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">No content yet</h2>
            <p className="text-muted mb-6">
              Start capturing knowledge by adding your first item
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus size={18} />
              Add Content
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => {
              const Icon = iconMap[content.type] || FileText;
              return (
                <div
                  key={content._id}
                  className="surface surface-hover rounded-3xl p-6 space-y-4 cursor-pointer transition-all"
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 flex-shrink-0">
                        <Icon size={18} className="text-zinc-200" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">
                          {content.title}
                        </h3>
                        <p className="text-xs text-muted mt-1">
                          {formatDate(content.createdAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(content._id)}
                      className="text-muted hover:text-red-500 transition flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
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

      <CreateContentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ContentPreviewModal
        isOpen={!!selectedContent && !isEditMode}
        onClose={() => setSelectedContent(null)}
        content={selectedContent}
        onEdit={() => setIsEditMode(true)}
      />
      <CreateContentModal
        isOpen={!!selectedContent && isEditMode}
        onClose={() => {
          setIsEditMode(false);
          setSelectedContent(null);
        }}
        editContent={selectedContent}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareLink={currentShareLink}
      />
    </div>
  );
}

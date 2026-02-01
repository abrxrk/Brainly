"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import ContentTypeToggle from "@/components/ContentTypeToggle";
import TagInput from "@/components/TagInput";
import { useContentStore } from "@/store/useContentStore";

export default function CreateContentModal({
  isOpen,
  onClose,
  editContent = null,
}) {
  const createContent = useContentStore((state) => state.createContent);
  const updateContent = useContentStore((state) => state.updateContent);

  const [formData, setFormData] = useState(
    editContent || {
      title: "",
      link: "",
      type: "article",
      tags: [],
      media: null,
    },
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { ...formData };

      // Validate based on type
      if (data.type === "article" && !data.link) {
        throw new Error("Link is required for articles");
      }
      if (["image", "video", "audio"].includes(data.type) && !data.media) {
        throw new Error("File is required for this content type");
      }

      if (editContent) {
        await updateContent(editContent._id, data);
        toast.success("Content updated successfully!");
      } else {
        await createContent(data);
        toast.success("Content created successfully!");
      }

      onClose();
      setFormData({
        title: "",
        link: "",
        type: "article",
        tags: [],
        media: null,
      });
    } catch (err) {
      toast.error("Failed to save content. Please check your input.");
    } finally {
      setLoading(false);
    }
  };

  const needsFile = ["image", "video", "audio"].includes(formData.type);
  const needsLink = formData.type === "article";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editContent ? "Edit Content" : "Add Content"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Title"
          type="text"
          placeholder="My awesome content"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <ContentTypeToggle
          value={formData.type}
          onChange={(type) => setFormData({ ...formData, type })}
        />

        {needsLink && (
          <Input
            label="Link"
            type="url"
            placeholder="https://example.com"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            required={needsLink}
          />
        )}

        {needsFile && (
          <div>
            <label className="text-sm font-medium text-[var(--fg)] mb-2 block">
              Upload File
            </label>
            <FileUpload
              accept={
                formData.type === "image"
                  ? "image/*"
                  : formData.type === "video"
                    ? "video/*"
                    : "audio/*"
              }
              onFileSelect={(file) => setFormData({ ...formData, media: file })}
            />
          </div>
        )}

        <TagInput
          tags={formData.tags}
          onChange={(tags) => setFormData({ ...formData, tags })}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading} className="flex-1">
            <Plus size={16} />
            {editContent ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

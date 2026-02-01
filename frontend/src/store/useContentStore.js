import { create } from "zustand";
import { api } from "@/lib/api";

export const useContentStore = create((set, get) => ({
  contents: [],
  loading: false,
  error: null,
  shareLink: null,

  fetchContents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getContent();
      set({ contents: response.data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createContent: async (data) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "tags") {
          formData.append(key, JSON.stringify(data[key]));
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      const response = await api.createContent(formData);
      set({ loading: false });
      await get().fetchContents();
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateContent: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "tags") {
          formData.append(key, JSON.stringify(data[key]));
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      const response = await api.updateContent(id, formData);
      set({ loading: false });
      await get().fetchContents();
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteContent: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.deleteContent(id);
      set({ loading: false });
      await get().fetchContents();
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createShareLink: async () => {
    try {
      const response = await api.createShareLink();
      set({ shareLink: response.data });
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

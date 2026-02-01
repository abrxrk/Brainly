import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        const response = await api.login(credentials);
        const token = response.data;
        localStorage.setItem("brainly-token", token);
        set({ token, isAuthenticated: true });
        return response;
      },

      signup: async (data) => {
        const response = await api.signup(data);
        return response;
      },

      logout: async () => {
        try {
          await api.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          localStorage.removeItem("brainly-token");
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      checkAuth: () => {
        const token = localStorage.getItem("brainly-token");
        if (token) {
          set({ token, isAuthenticated: true });
        }
      },
    }),
    {
      name: "brainly-auth",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
);

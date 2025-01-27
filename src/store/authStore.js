import { create } from "zustand";
import WebApp from "@twa-dev/sdk";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    }),

  initialize: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const telegramUser = WebApp.initDataUnsafe.user;
        set({
          user: telegramUser,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error("Initialization error:", error);
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

import { create } from "zustand";
import WebApp from "@twa-dev/sdk";

export const useAuthStore = create((set) => ({
  user: null,
  phone: null,
  isAuthenticated: false,
  loading: false,

  setPhone: (phone) => set({ phone }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    try {
      WebApp.ready();
      const token = localStorage.getItem("token");
      if (token) {
        const telegramUser = WebApp.initDataUnsafe.user;
        set({
          user: telegramUser,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Initialization error:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      phone: null,
      isAuthenticated: false,
    });
  },
}));

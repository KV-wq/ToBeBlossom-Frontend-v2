import { create } from "zustand";
import WebApp from "@twa-dev/sdk";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  phone: localStorage.getItem("phone"), // Сохраняем телефон
  isAuthenticated: false,
  loading: true,

  setPhone: (phone) => {
    localStorage.setItem("phone", phone); // Сохраняем в localStorage
    set({ phone });
  },

  setUser: (user, tokens) => {
    if (tokens) {
      localStorage.setItem("token", tokens.accessToken);
    }
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    });
  },

  initialize: async () => {
    try {
      WebApp.ready();
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const { data } = await api.get("/auth/me");
          const telegramUser = WebApp.initDataUnsafe.user;

          set({
            user: data.user,
            phone: data.user.phone,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("phone");
          set({
            user: null,
            phone: null,
            isAuthenticated: false,
            loading: false,
          });
        }
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
    localStorage.removeItem("phone");
    set({
      user: null,
      phone: null,
      isAuthenticated: false,
    });
  },
}));

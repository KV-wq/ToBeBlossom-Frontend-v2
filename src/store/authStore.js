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
      const telegramData = WebApp.initData;

      if (token) {
        try {
          // Проверяем существующий токен
          const { data } = await api.get("/auth/me");
          set({
            user: data.user,
            phone: data.user.phone,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          // Если токен невалидный, пробуем войти через Telegram
          try {
            const response = await api.post("/auth/telegram-login", {
              initData: telegramData,
            });

            if (response.data.success) {
              // Если пользователь найден по Telegram ID
              localStorage.setItem("token", response.data.tokens.accessToken);
              set({
                user: response.data.user,
                phone: response.data.user.phone,
                isAuthenticated: true,
                loading: false,
              });
            } else {
              // Если пользователь не найден, очищаем всё
              localStorage.removeItem("token");
              localStorage.removeItem("phone");
              set({
                user: null,
                phone: null,
                isAuthenticated: false,
                loading: false,
              });
            }
          } catch (telegramError) {
            // Если что-то пошло не так, очищаем всё
            localStorage.removeItem("token");
            localStorage.removeItem("phone");
            set({
              user: null,
              phone: null,
              isAuthenticated: false,
              loading: false,
            });
          }
        }
      } else {
        // Если нет токена, сразу пробуем войти через Telegram
        try {
          const response = await api.post("/auth/telegram-login", {
            initData: telegramData,
          });

          if (response.data.success) {
            // Если пользователь найден по Telegram ID
            localStorage.setItem("token", response.data.tokens.accessToken);
            set({
              user: response.data.user,
              phone: response.data.user.phone,
              isAuthenticated: true,
              loading: false,
            });
          } else {
            // Если пользователь не найден, оставляем на странице ввода номера
            set({
              loading: false,
            });
          }
        } catch (error) {
          // В случае ошибки оставляем на странице ввода номера
          set({
            loading: false,
          });
        }
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

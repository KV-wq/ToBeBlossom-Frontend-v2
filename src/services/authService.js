import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

export const authService = {
  sendVerificationCode: async (phone) => {
    try {
      const { data } = await api.post("/auth/send-code", { phone });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  verifyCode: async (phone, code) => {
    try {
      const { data } = await api.post("/auth/verify", { phone, code });
      if (data.tokens) {
        localStorage.setItem("token", data.tokens.accessToken);
      }
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      const { data } = await api.post("/auth/register", userData);
      if (data.tokens) {
        localStorage.setItem("token", data.tokens.accessToken);
        useAuthStore.getState().setUser(data.user);
      }
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

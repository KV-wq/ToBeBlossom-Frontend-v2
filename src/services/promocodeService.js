import api from "../api/axios";

export const promocodeService = {
  // Получение списка промокодов
  getPromocodes: async (params = {}) => {
    try {
      const { data } = await api.get("/promocodes", { params });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Создание промокода
  createPromocode: async (promocodeData) => {
    try {
      const { data } = await api.post("/promocodes", promocodeData);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Получение деталей промокода
  getPromocodeById: async (id) => {
    try {
      const { data } = await api.get(`/promocodes/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Обновление промокода
  updatePromocode: async (id, updateData) => {
    try {
      const { data } = await api.put(`/promocodes/${id}`, updateData);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Получение статистики
  getStatistics: async () => {
    try {
      const { data } = await api.get("/promocodes/statistics");
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

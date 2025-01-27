// src/store/promocodeStore.js
import { create } from "zustand";
import { promocodeService } from "../services/promocodeService";

export const usePromocodeStore = create((set, get) => ({
  // Состояние
  promocodes: [],
  statistics: null,
  currentPromocode: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 100,
    total: 0,
    pages: 0,
  },

  // Действия
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Получение списка промокодов
  fetchPromocodes: async (params = { page: 1, limit: 100, status: "all" }) => {
    try {
      set({ loading: true, error: null });
      const response = await promocodeService.getPromocodes(params);
      set({
        promocodes: response.promocodes,
        pagination: response.pagination,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || "Ошибка при загрузке промокодов",
        loading: false,
      });
    }
  },

  // Создание промокода
  createPromocode: async (promocodeData) => {
    try {
      set({ loading: true, error: null });
      const response = await promocodeService.createPromocode(promocodeData);
      // Добавляем новый промокод в начало списка
      set((state) => ({
        promocodes: [response.promocode, ...state.promocodes],
        loading: false,
      }));
      return response.promocode;
    } catch (error) {
      set({
        error: error.message || "Ошибка при создании промокода",
        loading: false,
      });
      throw error;
    }
  },

  // Получение деталей промокода
  fetchPromocodeById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await promocodeService.getPromocodeById(id);
      set({
        currentPromocode: response.promocode,
        loading: false,
      });
      return response.promocode;
    } catch (error) {
      set({
        error: error.message || "Ошибка при загрузке промокода",
        loading: false,
      });
      throw error;
    }
  },

  // Обновление промокода
  updatePromocode: async (id, updateData) => {
    try {
      set({ loading: true, error: null });
      const response = await promocodeService.updatePromocode(id, updateData);
      // Обновляем промокод в списке
      set((state) => ({
        promocodes: state.promocodes.map((promo) =>
          promo._id === id ? response.promocode : promo
        ),
        currentPromocode: response.promocode,
        loading: false,
      }));
      return response.promocode;
    } catch (error) {
      set({
        error: error.message || "Ошибка при обновлении промокода",
        loading: false,
      });
      throw error;
    }
  },

  // Получение статистики
  fetchStatistics: async () => {
    try {
      set({ loading: true, error: null });
      const response = await promocodeService.getStatistics();
      set({
        statistics: response.statistics,
        loading: false,
      });
      return response.statistics;
    } catch (error) {
      set({
        error: error.message || "Ошибка при загрузке статистики",
        loading: false,
      });
      throw error;
    }
  },

  // Очистка текущего промокода
  clearCurrentPromocode: () => set({ currentPromocode: null }),

  // Очистка ошибок
  clearError: () => set({ error: null }),
}));

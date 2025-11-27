"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Car, CarsResponse } from "@/types/car";
import { carApi, type CarsQuery } from "@/lib/api/serverApi";

export interface Filters {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

interface CarsState {
  cars: Car[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  filters: Filters;
  favourites: string[];

  setFilters: (filters: Partial<Filters>) => void;
  resetCars: () => void;
  loadCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavourite: (id: string) => void;
}

const initialFilters: Filters = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

export const useCarsStore = create<CarsState>()(
  persist(
    (set, get) => ({
      cars: [],
      page: 1,
      totalPages: 1,
      isLoading: false,
      error: null,
      filters: initialFilters,
      favourites: [],

      setFilters: (partial) =>
        set((state) => ({
          filters: { ...state.filters, ...partial },
        })),

      resetCars: () => set({ cars: [], page: 1, totalPages: 1 }),

      loadCars: async () => {
        const { filters } = get();
        try {
          set({ isLoading: true, error: null });

          const params: CarsQuery = {
            ...filters,
            page: 1,
            limit: 12,
          };

          const data: CarsResponse = await carApi.getCars(params);

          set({
            cars: data.cars,
            page: data.page,
            totalPages: data.totalPages,
          });
        } catch {
          set({ error: "Не вдалося завантажити авто" });
        } finally {
          set({ isLoading: false });
        }
      },

      loadMore: async () => {
        const { page, totalPages, filters, cars } = get();
        if (page >= totalPages) return;

        try {
          set({ isLoading: true, error: null });

          const params: CarsQuery = {
            ...filters,
            page: page + 1,
            limit: 12,
          };

          const data = await carApi.getCars(params);

          set({
            cars: [...cars, ...data.cars],
            page: data.page,
            totalPages: data.totalPages,
          });
        } catch {
          set({ error: "Помилка під час завантаження наступної сторінки" });
        } finally {
          set({ isLoading: false });
        }
      },

      toggleFavourite: (id) =>
        set((state) => {
          const exists = state.favourites.includes(id);
          return {
            favourites: exists
              ? state.favourites.filter((x) => x !== id)
              : [...state.favourites, id],
          };
        }),
    }),
    {
      name: "car-rental-store",
      partialize: (state) => ({ favourites: state.favourites }),
    }
  )
);

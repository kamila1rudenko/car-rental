import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Car } from "@/types/car";
import { Filters } from "@/types/filter";

interface CarStoreState {
  filters: Filters;
  favorites: Record<string, Car>;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  toggleFavorite: (car: Car) => void;
  isFavorite: (id: string) => boolean;
}

const initialFilters: Filters = {
  brand: null,
  rentalPrice: null,
  minMileage: "",
  maxMileage: "",
};

export const useCarStore = create<CarStoreState>()(
  persist(
    (set, get) => ({
      filters: initialFilters,
      favorites: {},

      setFilters: (patch) =>
        set((state) => ({
          filters: { ...state.filters, ...patch },
        })),

      resetFilters: () =>
        set({
          filters: initialFilters,
        }),

      toggleFavorite: (car) =>
        set((state) => {
          const exists = state.favorites[car.id];
          if (exists) {
            const copy = { ...state.favorites };
            delete copy[car.id];
            return { favorites: copy };
          }
          return {
            favorites: { ...state.favorites, [car.id]: car },
          };
        }),

      isFavorite: (id) => Boolean(get().favorites[id]),
    }),
    {
      name: "car-rental-store",
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);

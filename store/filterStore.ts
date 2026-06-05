"use client";

import { create } from "zustand";
import type { FuelType, Transmission, BodyType } from "@/types/car";

interface FilterState {
  brand: string[];
  city: string;
  minPrice: number;
  maxPrice: number;
  fuelType: FuelType[];
  transmission: Transmission[];
  bodyType: BodyType[];
  minYear: number;
  maxYear: number;
  maxKm: string;
  sort: string;
  page: number;
  setBrand: (brands: string[]) => void;
  setCity: (city: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setFuelType: (types: FuelType[]) => void;
  setTransmission: (types: Transmission[]) => void;
  setBodyType: (types: BodyType[]) => void;
  setYearRange: (min: number, max: number) => void;
  setMaxKm: (km: string) => void;
  setSort: (sort: string) => void;
  setPage: (page: number) => void;
  clearAll: () => void;
  getActiveFilterCount: () => number;
}

const DEFAULT_MIN_YEAR = 2005;
const DEFAULT_MAX_YEAR = 2025;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 5000000;

export const useFilterStore = create<FilterState>((set, get) => ({
  brand: [],
  city: "",
  minPrice: DEFAULT_MIN_PRICE,
  maxPrice: DEFAULT_MAX_PRICE,
  fuelType: [],
  transmission: [],
  bodyType: [],
  minYear: DEFAULT_MIN_YEAR,
  maxYear: DEFAULT_MAX_YEAR,
  maxKm: "",
  sort: "newest",
  page: 1,

  setBrand: (brands) => set({ brand: brands, page: 1 }),
  setCity: (city) => set({ city, page: 1 }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max, page: 1 }),
  setFuelType: (types) => set({ fuelType: types, page: 1 }),
  setTransmission: (types) => set({ transmission: types, page: 1 }),
  setBodyType: (types) => set({ bodyType: types, page: 1 }),
  setYearRange: (min, max) => set({ minYear: min, maxYear: max, page: 1 }),
  setMaxKm: (km) => set({ maxKm: km, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setPage: (page) => set({ page }),

  clearAll: () =>
    set({
      brand: [],
      city: "",
      minPrice: DEFAULT_MIN_PRICE,
      maxPrice: DEFAULT_MAX_PRICE,
      fuelType: [],
      transmission: [],
      bodyType: [],
      minYear: DEFAULT_MIN_YEAR,
      maxYear: DEFAULT_MAX_YEAR,
      maxKm: "",
      sort: "newest",
      page: 1,
    }),

  getActiveFilterCount: () => {
    const state = get();
    let count = 0;
    if (state.brand.length > 0) count++;
    if (state.city) count++;
    if (state.minPrice > DEFAULT_MIN_PRICE || state.maxPrice < DEFAULT_MAX_PRICE) count++;
    if (state.fuelType.length > 0) count++;
    if (state.transmission.length > 0) count++;
    if (state.bodyType.length > 0) count++;
    if (state.minYear > DEFAULT_MIN_YEAR || state.maxYear < DEFAULT_MAX_YEAR) count++;
    if (state.maxKm) count++;
    return count;
  },
}));

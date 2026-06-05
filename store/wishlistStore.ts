"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const current = get().ids;
        const exists = current.includes(id);
        set({ ids: exists ? current.filter((i) => i !== id) : [...current, id] });
      },
      isWishlisted: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "gaadibazaar-wishlist" }
  )
);

import { create } from "zustand";
import { Stock } from "@/types";

export const useStockStore = create<Stock>((set) => ({
    products: 0,
    categories: 0,
    updateStockStatus: () => {
        set((state) => ({
            products: state.products + 1,
            categories: state.categories + 2,
        }))
    },
}));

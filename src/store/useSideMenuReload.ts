import { create } from "zustand";
import {
  fetchCashiers,
  fetchItemsAndCaetegories,
} from "@/actions/fetchInformation";
import { CashiersStatusCount, ItemsAndCategoriesCount } from "@/types";

type CashiersStatus = CashiersStatusCount & {
  update: () => Promise<void>;
};

type ItemsAndCategories = ItemsAndCategoriesCount & {
  update: () => Promise<void>;
};

export const useCashierStatus = create<CashiersStatus>((set) => ({
  active_cashiers: 0,
  inactive_cashiers: 0,
  update: async () => {
    try {
      const {
        body: { payload },
      } = await fetchCashiers();
      set(payload);
    } catch (error) {
      console.error("Error updating cashier status:", error);
    }
  },
}));

export const useItemsAndCategories = create<ItemsAndCategories>((set) => ({
  items: 0,
  categories: 0,
  update: async () => {
    try {
      const {
        body: { payload },
      } = await fetchItemsAndCaetegories();
      set(payload);
    } catch (error) {
      console.error("Error updating items and categories count:", error);
    }
  },
}));

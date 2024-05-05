import { create } from "zustand";
import { Cashier } from "@/types";

export const useCashierStore = create<Cashier>((set) => ({
  active: 0,
  inactive: 0,
  updateCashierStatus: () => {
    set((state) => ({
        active: state.active + 1,
        inactive: state.inactive + 2,
    }))
  },
}));

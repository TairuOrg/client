import { create } from "zustand";
import { Cashier } from "@/types";
import { BASE_URL } from "@/constants";

export const useCashierStore = create<Cashier>((set) => ({
  active: 0,
  inactive: 0,
  updateCashierStatus: async () => {
    // const response = await fetch(`${BASE_URL}/cashier-status`);
    // const x= await response.json();
    // console.log('adad', x)
    set((state) => ({
        active: state.active + 1,
        inactive: state.inactive + 2,
    }))
  },
}));

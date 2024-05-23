import { create } from "zustand";
import { retrieveRevenues } from "@/actions/revenues";
type Revenue = {
  VE: { amount: number };
  US: { amount: number };
  EU: { amount: number };
  update: () => void;
};
const response =  retrieveRevenues()
export const useRevenue = create<Revenue>((set) => ({
  VE: {
    amount: 0,
  },
  US: {
    amount: 0,
  },
  EU: {
    amount: 0,
  },
  update: () => {
    set(({ EU, VE, US }) => ({
      EU: {
        amount: EU.amount + 1,
      },
      VE: {
        amount: VE.amount+=2,
      },
      US: {
        amount: US.amount + 4,
      },
    }));
  },
}));

// store/useRevenue.ts
import { create } from "zustand";
import { retrieveRevenues } from "@/actions/revenues";

type Revenue = {
  VE: { amount: string };
  US: { amount: string };
  EU: { amount: string };
  update: () => Promise<void> ;
};

export const useRevenue = create<Revenue>((set) => ({
  VE: { amount: "cargando..." },
  US: { amount: "cargando..." },
  EU: { amount: "cargando..." },
  update: async () => {
    const {body} = await retrieveRevenues();
      const { payload } = body;
      set({
        VE: { amount: payload.VE.amount },
        US: { amount: payload.US.amount },
        EU: { amount: payload.EU.amount },
      });
  },
}));

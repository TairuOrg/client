// store/useRevenue.ts
import { create } from "zustand";
import { retrieveRevenues } from "@/actions/revenues";

type Revenue = {
  VE: { amount: number };
  US: { amount: number };
  EU: { amount: number };
  update: () => void;
};

export const useRevenue = create<Revenue>((set) => ({
  VE: { amount: 0 },
  US: { amount: 0 },
  EU: { amount: 0 },
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

// Initial fetch to set default values
retrieveRevenues().then(({ body }) => {
  const { payload } = body;

  useRevenue.setState({
    VE: { amount: payload.VE.amount },
    US: { amount: payload.US.amount },
    EU: { amount: payload.EU.amount },
  });
});

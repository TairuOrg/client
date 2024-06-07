import { create } from "zustand";

type ActiveSteps = {
  active: number[];
  current: () => number;
  updateActiveSteps: () => void;
};

export const useActiveStepsStore = create<ActiveSteps>((set, get) => ({
  active: [1],
  updateActiveSteps: () => {
    set((state) => {

      const newActive = state.active[state.active.length - 1] + 1;
      return {
        active: [...state.active, newActive],
      };
    });
  },
  current: () => {
    const state = get();
    return state.active[state.active.length - 1];
  },
}));

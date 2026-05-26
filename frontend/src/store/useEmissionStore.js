import { create } from "zustand";

const useEmissionStore = create((set) => ({
  emissions: [],

  setEmissions: (data) => set({ emissions: data }),

  addEmission: (newEmission) =>
    set((state) => ({
      emissions: [...state.emissions, newEmission],
    })),

  clearEmissions: () => set({ emissions: [] }),
}));

export default useEmissionStore;

import { create } from "zustand";

const useEmissionStore = create((set) => ({
  emissions: [],

  setEmissions: (data) =>
    set({
      emissions: data,
    }),

  clearEmissions: () =>
    set({
      emissions: [],
    }),
}));

export default useEmissionStore;

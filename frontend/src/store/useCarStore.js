import { create } from "zustand";

const useCarStore = create((set) => ({
  cars: [],

  setCars: (newCars) => set({ cars: newCars }),

  clearCars: () => set({ cars: [] }),
}));

export default useCarStore;

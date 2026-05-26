import { create } from "zustand";

const useCarStore = create((set) => ({
  car: {},

  setCar: (newCar) => set({ car: newCar }),

  clearCar: () => set({ car: {} }),
}));

export default useCarStore;

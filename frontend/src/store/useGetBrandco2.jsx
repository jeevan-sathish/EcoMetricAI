import { create } from "zustand";

const useGetBrandco2 = create((set) => ({
  brandCo2: [],

  minCo2: {},

  setBrandCo2: (newData) => set({ brandCo2: newData }),

  setMinCo2: (newData) => set({ minCo2: newData }),
}));

export default useGetBrandco2;

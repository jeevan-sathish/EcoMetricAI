import { create } from "zustand";

const useSingleDataStore = create((set) => ({
  singleData: {},

  setSingleData: (newData) => set({ singleData: newData }),
}));

export default useSingleDataStore;

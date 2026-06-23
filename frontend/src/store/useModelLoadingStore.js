import { create } from "zustand";

const useModelLoadingStore = create((set) => ({
  modelLoading: false,

  setModelLoading: (value) => set({ modelLoading: value }),
}));

export default useModelLoadingStore;

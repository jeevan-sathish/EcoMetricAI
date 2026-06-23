import { create } from "zustand";

const useDropdownCacheStore = create((set, get) => ({
  brands: [],
  modelsCache: {},

  setBrands: (brands) => set({ brands }),

  setModelsForBrand: (brand, models) =>
    set((state) => ({
      modelsCache: {
        ...state.modelsCache,
        [brand]: models,
      },
    })),

  getModelsForBrand: (brand) => get().modelsCache[brand] || [],

  hasModelsForBrand: (brand) => !!get().modelsCache[brand],
}));

export default useDropdownCacheStore;

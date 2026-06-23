import { create } from "zustand";

const useAIassistantToggleStore = create((set) => ({
  toggleAiMode: false,

  setToggleAiMode: () =>
    set((state) => ({
      toggleAiMode: !state.toggleAiMode,
    })),
}));

export default useAIassistantToggleStore;

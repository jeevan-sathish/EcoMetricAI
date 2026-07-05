import { create } from "zustand";

const useCustomChatStore = create((set) => ({
  messages: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () =>
    set({
      messages: [],
    }),
}));

export default useCustomChatStore;

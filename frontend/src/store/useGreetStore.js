import { create } from "zustand";

const useGreetStore = create((set) => ({
  name: "",
  setName: (name) => set({ name }),
}));

export default useGreetStore;

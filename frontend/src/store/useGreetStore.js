import { create } from "zustand";

const useGreetStore = create((set) => ({
  name: "",
  email: "",
  profile_picture: "",

  setName: (name) => set({ name }),

  setEmail: (email) => set({ email }),

  setProfilePicture: (profile_picture) => set({ profile_picture }),
}));

export default useGreetStore;

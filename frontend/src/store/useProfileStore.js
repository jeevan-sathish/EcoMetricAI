import { create } from "zustand";

const useProfileStore = create((set) => ({
  name: "",
  email: "",
  profile_picture: "",

  setName: (name) => set({ name }),

  setEmail: (email) => set({ email }),

  setProfilePicture: (profile_picture) => set({ profile_picture }),
}));

export default useProfileStore;

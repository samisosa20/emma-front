import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  token: string;
  addToken: (token: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      token: "",
      addToken: (token) => set({ token }),
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

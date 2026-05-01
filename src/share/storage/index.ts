import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  PostApiAuthLogin200,
  PostApiAuthLogin200AccountsTypeItem,
  PostApiAuthLogin200BadgesItem,
  PostApiAuthLogin200Data,
  PostApiAuthLogin200GroupsCategoryItem,
  PostApiAuthLogin200PeriodsItem,
} from "@@@/domain/models";

type UserStore = {
  groupsCategory: PostApiAuthLogin200GroupsCategoryItem[];
  periods: PostApiAuthLogin200PeriodsItem[];
  badges: PostApiAuthLogin200BadgesItem[];
  accountsType: PostApiAuthLogin200AccountsTypeItem[];
  user: PostApiAuthLogin200Data;
  setLoginData: (login: PostApiAuthLogin200) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: {},
      groupsCategory: [],
      periods: [],
      badges: [],
      accountsType: [],
      setLoginData: (login) =>
        set({
          user: login.data,
          groupsCategory: login.groupsCategory,
          periods: login.periods,
          badges: login.badges,
          accountsType: login.accountsType,
        }),
      logout: () =>
        set({
          user: {},
          groupsCategory: [],
          periods: [],
          badges: [],
          accountsType: [],
        }),
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

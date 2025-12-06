import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  PostApiV2AuthLogin200,
  PostApiV2AuthLogin200AccountsTypeItem,
  PostApiV2AuthLogin200BadgesItem,
  PostApiV2AuthLogin200Data,
  PostApiV2AuthLogin200GroupsCategoryItem,
  PostApiV2AuthLogin200PeriodsItem,
} from "@@@/domain/models";

type UserStore = {
  token: string;
  groupsCategory: PostApiV2AuthLogin200GroupsCategoryItem[];
  periods: PostApiV2AuthLogin200PeriodsItem[];
  badges: PostApiV2AuthLogin200BadgesItem[];
  accountsType: PostApiV2AuthLogin200AccountsTypeItem[];
  user: PostApiV2AuthLogin200Data;
  setLoginData: (login: PostApiV2AuthLogin200) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      token: "",
      user: {},
      groupsCategory: [],
      periods: [],
      badges: [],
      accountsType: [],
      setLoginData: (login) =>
        set({
          token: login.token,
          user: login.data,
          groupsCategory: login.groupsCategory,
          periods: login.periods,
          badges: login.badges,
          accountsType: login.accountsType,
        }),
      logout: () =>
        set({
          token: "",
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

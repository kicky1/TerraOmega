import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AuthorizationStoreState = {
  authorized: boolean;
  username: string;
  isSubscriber: boolean;
  subDays: number;
  setAuthorized: (flag: boolean) => void;
  setUsername: (name: string) => void;
  setIsSubscriber: (flag: boolean) => void;
  logoutUser: () => void;
  setSubDays: (days: number) => void
};

export const useAuthorizationStore = create<AuthorizationStoreState>()(
  immer((set) => ({
    authorized: false,
    isSubscriber: false,
    username: "",
    subDays: 0,

    logoutUser: () => {
      set((state) => {
        state.authorized = false;
        state.isSubscriber = false;
      });
      localStorage.removeItem("username");
      location.reload();
    },
    setAuthorized: (flag) => {
      set((state) => {
        state.authorized = flag;
      });
    },
    setUsername: (name) => {
      set((state) => {
        state.username = name;
      });
    },
    setIsSubscriber: (flag) => {
      set((state) => {
        state.isSubscriber = flag;
      });
    },
    setSubDays: (days) => {
      set((state) => {
        state.subDays = days;
      });
    }
  }))
);

export const { logoutUser, setAuthorized, setUsername, setIsSubscriber, setSubDays } =
  useAuthorizationStore.getState();

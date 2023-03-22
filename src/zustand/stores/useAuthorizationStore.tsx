import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AuthorizationStoreState = {
  authorized: boolean;
  username: string;
  isSubscriber: boolean;
  setAuthorized: (flag: boolean) => void;
  setUsername: (name: string) => void;
  setIsSubscriber: (flag: boolean) => void;
  logoutUser: () => void;
};

export const useAuthorizationStore = create<AuthorizationStoreState>()(
  immer((set) => ({
    authorized: false,
    isSubscriber: false,
    username: "",
    logoutUser: () => {
      set((state) => {
        state.authorized = false;
        state.isSubscriber = false;
      });
      localStorage.removeItem("username");
      location.reload()

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
  }))
);

export const { logoutUser, setAuthorized, setUsername, setIsSubscriber } =
  useAuthorizationStore.getState();

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type NotificationStoreState = {
  battleError: boolean;
  setBattleError: (flag: boolean) => void;
  battleSuccess: boolean;
  setBattleSuccess: (flag: boolean) => void;
  scrapEarned: number;
  setScrapEarned: (amount: number) => void;
};

export const useNotificationStore = create<NotificationStoreState>()(
  immer((set) => ({
    battleError: false,
    battleSuccess: false,
    scrapEarned: 0,
    setBattleError: (flag) => {
      set((state) => {
        state.battleError = flag;
      });
    },
    setBattleSuccess: (flag) => {
      set((state) => {
        state.battleSuccess = flag;
      });
    },
    setScrapEarned: (amount) => {
      set((state) => {
        state.scrapEarned = amount;
      });
    },
  }))
);

export const { setBattleError, setBattleSuccess, setScrapEarned } =
  useNotificationStore.getState();

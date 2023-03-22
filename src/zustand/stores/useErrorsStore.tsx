import create from "zustand";
import { immer } from "zustand/middleware/immer";

type ErrorsStoreState = {
  battleError: boolean;
  setBattleError: (flag: boolean) => void;
};

export const useErrorsStore = create<ErrorsStoreState>()(
  immer((set) => ({
    battleError: false,
    setBattleError: (flag) => {
      set((state) => {
        state.battleError = flag;
      });
    },
  }))
);

export const { battleError, setBattleError } = useErrorsStore.getState();

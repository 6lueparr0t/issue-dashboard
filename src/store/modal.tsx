import { create } from "zustand";
import { Modal } from "@/components/components.d";

type Store = {
  modals: Modal[];
  pushModals: (modal: Modal) => void;
  popModals: () => void;
};

const modalStore = create<Store>()((set) => ({
  modals: [],
  pushModals: (modal: Modal) => {
    set((state) => {
      state.modals.push(modal);
      return { modals: state.modals };
    });
  },
  popModals: () => {
    set((state) => {
      state.modals.pop();
      return { modals: state.modals };
    });
  },
}));

export default modalStore;

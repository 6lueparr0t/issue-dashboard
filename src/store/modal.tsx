import { create } from "zustand";

type Store = {
  show: boolean;
  setShow: (props: boolean) => void;
  current: number;
  setCurrent: (props: number) => void;
  inc: () => void;
  dec: () => void;
};

const modalStore = create<Store>()((set) => ({
  show: true,
  setShow: (props: boolean) => {
    set((state) => {
      return { show: props };
    });
  },
  current: 0,
  setCurrent: (props: number) => {
    set((state) => {
      return { current: props };
    });
  },
  inc: () => set((state) => ({ current: state.current + 1 })),
  dec: () => set((state) => ({ current: state.current > 0 ? state.current - 1 : 0 })),
}));

export default modalStore;

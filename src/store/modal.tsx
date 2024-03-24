import { create } from "zustand";

type Store = {
  setModal: (
    props: boolean,
    message: string,
    type: string,
    prevRef: React.RefObject<HTMLInputElement> | null
  ) => void;
  show: boolean;
  setShow: (props: boolean) => void;
  message: string;
  type: string;
  prevRef: React.RefObject<HTMLInputElement> | null;
  // current: number;
  // setCurrent: (props: number) => void;
  // inc: () => void;
  // dec: () => void;
};

const modalStore = create<Store>()((set) => ({
  show: false,
  setShow: (props: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set((_) => {
      return { show: props };
    });
  },
  message: "",
  type: "alert", // alert, confirm
  prevRef: null,
  setModal: (
    props: boolean,
    message: string,
    type: string,
    prevRef: React.RefObject<HTMLInputElement> | null
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set((_) => {
      return { show: props, message: message, type: type, prevRef: prevRef };
    });
  },
  // inc: () => set((state) => ({ current: state.current + 1 })),
  // dec: () => set((state) => ({ current: state.current > 0 ? state.current - 1 : 0 })),
}));

export default modalStore;

import React, { useEffect, useRef } from "react";
import modalStore from "@/store/modal";
import { Modal } from "@/components/components.d";

interface ModalProps extends React.PropsWithChildren {
  modal: Modal;
  index: number;
}

const Modal: React.FC<ModalProps> = ({ modal, index }) => {
  const { popModals } = modalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      modalRef.current?.focus();
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const closeModal = () => {
    popModals();
    setTimeout(() => {
      if (modal?.prevRef?.current) modal?.prevRef?.current?.focus();
    }, 10);
  };

  const keyDownLockHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      closeModal();
    }
  };

  return (
    <div className="flex items-center justify-center h-0">
      <div
        ref={modalRef}
        tabIndex={0}
        className={`fixed z-${Number(10000 + index)} inset-0 overflow-y-auto`}
        onKeyDown={keyDownLockHandler}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white mt-8">
              <p className="text-xl font-bold text-center">{modal.message}</p>
            </div>
            <div className="bg-white py-4 justify-around sm:px-6 sm:flex">
              {modal.type === "alert" && (
                <button
                  onClick={closeModal}
                  className="w-full inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  확인
                </button>
              )}
              {modal.type === "confirm" && modal.optionComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

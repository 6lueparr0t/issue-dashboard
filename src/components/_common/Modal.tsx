import React, { useEffect, useRef } from "react";
import modalStore from "@/store/modal";

// interface ModalProps extends React.PropsWithChildren {}
// const Modal: React.FC<ModalProps> = ({ children }) => {

const Modal: React.FC = () => {
  const { show, setShow, message, type, prevRef } = modalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      // 모달이 열릴 때 모달 내부 첫 번째 요소에 포커스를 줌
      modalRef.current?.focus();
    }
  }, [show]);

  const closeModal = () => {
    setShow(false);
    setTimeout(() => prevRef?.current?.focus(), 10);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      closeModal();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {show && (
        <div
          ref={modalRef}
          tabIndex={0}
          className="fixed z-10 inset-0 overflow-y-auto"
          onKeyDown={handleKeydown}
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p className="text-xl font-bold m-4 text-center">{message}</p>
              </div>
              <div className="bg-white px-4 py-3 justify-center sm:px-6 sm:flex">
                {type !== "confirm" ? (
                  <button
                    onClick={closeModal}
                    className="w-full inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    확인
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

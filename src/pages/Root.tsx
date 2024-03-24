import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/_common/Navigation";
import Modal from "@/components/_common/Modal";

import modalStore from "@/store/modal";

const Root = () => {
  const {modals} = modalStore();

  useEffect(() => {
    if(modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modals]);

  return (
    <>
      <main>
        <Navigation />
        <Outlet />
        {modals.map((modal, index) => (
          <div key={`modal-${index}`} className="h-0">
            <Modal modal={modal} index={index}/>
          </div>
        ))}
      </main>
    </>
  );
};

export default Root;

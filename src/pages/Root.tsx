import { Outlet } from "react-router-dom";
import Navigation from "@/components/_common/Navigation";
import Modal from "@/components/_common/Modal";

import modalStore from "@/store/modal";

const Root = () => {
  const {modals} = modalStore();

  return (
    <>
      <main>
        <Navigation />
        <Outlet />
        <div className="h-0">
          {modals.map((modal, index) => (
            <Modal key={`modal-${index}`} modal={modal} index={index}/>
          ))}
        </div>
      </main>
    </>
  );
};

export default Root;

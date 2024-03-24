import { Outlet } from "react-router-dom";
import Navigation from "@/components/_common/Navigation";
import Modal from "@/components/_common/Modal";

const Root = () => {
  return (
    <>
      <main>
        <Navigation />
        <Outlet />
        <div className="h-0">
          <Modal />
        </div>
      </main>
    </>
  );
};

export default Root;

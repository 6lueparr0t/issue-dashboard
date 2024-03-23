import Navigation from "@/components/_common/Navigation";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <main>
        <Navigation />
        <Outlet />
      </main>
    </>
  );
};

export default Root;

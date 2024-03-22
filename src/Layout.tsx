import { PropsWithChildren, useEffect } from "react";

const Layout : React.FC<PropsWithChildren> = (props) => {
  useEffect(() => {
  }, []);

  return (
    <>
      {props.children}
    </>
  );
}

export default Layout;

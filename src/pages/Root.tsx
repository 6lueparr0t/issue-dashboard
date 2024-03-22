import { Outlet, useNavigation } from "react-router-dom";

const Root = () => {
  const navigation = useNavigation();
  return <>
  <main>
    {/* idle / loading / submitting */}
    {navigation.state === "loading" && <p>Loading ... </p>}
    <Outlet />
  </main>
  </>
}

export default Root;
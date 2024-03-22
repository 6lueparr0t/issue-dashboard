import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "@/pages/Root";
import HomePage from "@/pages/Home";
import TestPage, {action as TestAction} from "@/pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <Error />,
    children: [
      { index: true, path: "", element: <HomePage /> },
      {
        path: "test",
        element: <TestPage />,
        action: TestAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

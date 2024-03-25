import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "@/pages/Root";
import HomePage, { loader as HomeLoader } from "@/pages/Home";
import BoardPage, { loader as BoardLoader } from "@/pages/Board";
import BoardViewPage, { loader as BoardViewLoader, action as BoardViewAction } from "@/pages/Board/View";
import BoardNewPage, { loader as BoardNewLoader, action as BoardNewAction } from "@/pages/Board/New";
import BoardEditPage, { loader as BoardEditLoader, action as BoardEditAction } from "@/pages/Board/Edit";

import ErrorPage from "@/pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "", id: "home", element: <HomePage />, loader: HomeLoader },
      {
        path: ":category",
        id: "board",
        element: <BoardPage />,
        loader: BoardLoader,
      },
      {
        path: ":category/:issueNumber",
        id: "board-view",
        element: <BoardViewPage />,
        loader: BoardViewLoader,
        action: BoardViewAction,
      },
      {
        path: ":category/new",
        id: "board-new",
        element: <BoardNewPage />,
        loader: BoardNewLoader,
        action: BoardNewAction,
      },
      {
        path: ":category/:issueNumber/edit",
        id: "board-edit",
        element: <BoardEditPage />,
        loader: BoardEditLoader,
        action: BoardEditAction,
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "@/pages/Root";
import HomePage, { loader as HomeLoader } from "@/pages/Home";
import BoardPage, { loader as BoardLoader } from "@/pages/Board";
import BoardViewPage, { loader as BoardViewLoader, action as BoardViewAction } from "@/pages/Board/View";
// import BoardPage, { loader as BoardLoader, action as BoardAction } from "@/pages/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

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
      // {
      //   path: ":category/:issueNumber/edit",
      //   id: "board-edit",
      //   element: <BoardViewPage />,
      //   loader: BoardViewLoader,
      // },
      // {
      //   path: ":category/:issueNumber/new",
      //   id: "board-new",
      //   element: <BoardViewPage />,
      //   loader: BoardViewLoader,
      // }
    ]
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

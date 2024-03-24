import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "@/pages/Root";
import HomePage, { loader as HomeLoader } from "@/pages/Home";
import BoardPage, { loader as BoardLoader } from "@/pages/Board";
import BoardViewPage, { loader as BoardViewLoader } from "@/pages/Board/View";
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
        //   {
        //     path: ":eventId",
        //     id: "event-detail",
        //     loader: eventDetailLoader,
        //     children: [
        //       {
        //         index: true,
        //         element: <EventDetailPage />,
        //         action: deleteEventAction,
        //       },
        //       {
        //         path: "edit",
        //         element: <EditEventPage />,
        //         action: manipulateEventAction,
        //       },
        //     ],
        //   },
        //   { path: "new", element: <NewEventPage />, action: manipulateEventAction },
        // ],
      },
      {
        path: ":category/:issueNumber",
        id: "board-new",
        element: <BoardViewPage />,
        loader: BoardViewLoader,
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

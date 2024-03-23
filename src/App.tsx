import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "@/pages/Root";
import HomePage, { loader as HomeLoader } from "@/pages/Home";
import BoardPage, { loader as BoardLoader, action as BoardAction } from "@/pages/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      { index: true, path: "", element: <HomePage />, id: "home", loader: HomeLoader },
      {
        path: ":type",
        element: <BoardPage />,
        id: "board",
        loader: BoardLoader,
        action: BoardAction,
        // children: [
        //   { index: true, element: <EventsPage />, loader: eventsLoader },
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

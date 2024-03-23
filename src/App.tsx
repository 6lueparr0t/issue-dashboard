import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "@/pages/Root";
import HomePage from "@/pages/Home";
import BoardPage, { loader as BoardLoder, action as BoardAction } from "@/pages/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, path: "", element: <HomePage title="홈"/> },
      {
        path: ":type",
        element: <BoardPage/>,
        id: "type",
        loader: BoardLoder,
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

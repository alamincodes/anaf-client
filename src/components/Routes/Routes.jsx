import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../home/Home";

export const routes = createBrowserRouter([
  {
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

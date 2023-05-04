import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../home/Home";
import Products from "../products/Products";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Cart from "../cart/Cart";
import Checkout from "../cart/Checkout";
import PrivateRoutes from "./PrivateRoutes";
import ForgetPAssword from "../auth/ForgetPAssword";
import Settings from "../auth/settings/Settings";
import General from "../auth/settings/General";
import ChangePassword from "../auth/settings/ChangePassword";
import DangerZone from "../auth/settings/DangerZone";

export const routes = createBrowserRouter([
  {
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/forgetPAssword",
        element: <ForgetPAssword />,
      },
      {
        path: "/settings",
        element: (
          <PrivateRoutes>
            <Settings />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "/settings/general",
            element: <General />,
          },
          {
            path: "/settings/changePassword",
            element: <ChangePassword />,
          },
          {
            path: "/settings/dangerZone",
            element: <DangerZone />,
          },
        ],
      },
    ],
  },
]);

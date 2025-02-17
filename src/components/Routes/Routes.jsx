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
import Orders from "../orders/Orders";
import OrderDetails from "../orders/OrderDetails";
import DashboardLayout from "../Dashboard/DashboardLayout";
import AllUsers from "../Dashboard/AllUsers";
import PrivateAdminRoute from "./PrivateAdminRoute";
import AllOrders from "../Dashboard/AllOrders";
import AddProducts from "../Dashboard/AddProducts";
import ProductDetail from "../products/ProductDetail";
import Invoice from "../orders/Invoice";
import CategoryProducts from "../home/categories/CategoryProducts";
import Search from "../search/Search";
import AllProducts from "../Dashboard/AllProducts";
import EditProduct from "../Dashboard/EditProduct";
import Contact from "../Dashboard/Contact";
import PageNotFound from "../Shared/PageNotFound";
import Profile from "../auth/settings/Profile";
import ProcessCheckout from "../payment/ProcessCheckout";
import RefundPolicy from "../refundPolicy/RefundPolicy";
import Refund from "../payment/redund/Refund";
import SearchPayment from "../payment/searchPayment/SearchPayment";

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
        path: "/products/:category",
        element: <CategoryProducts />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/search-payment",
        element: <SearchPayment />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
        path: "/orders",
        element: (
          <PrivateRoutes>
            <Orders />
          </PrivateRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoutes>
            <OrderDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/invoice/:id",
        element: (
          <PrivateRoutes>
            <Invoice />
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
        path: "/refund-policy",
        element: <RefundPolicy />,
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
      {
        path: "/dashboard",
        element: (
          <PrivateAdminRoute>
            <DashboardLayout />
          </PrivateAdminRoute>
        ),
        children: [
          {
            path: "/dashboard/allUsers",
            element: <AllUsers />,
          },
          {
            path: "/dashboard/allOrders",
            element: <AllOrders />,
          },
          {
            path: "/dashboard/addProducts",
            element: <AddProducts />,
          },
          {
            path: "/dashboard/allProduct",
            element: <AllProducts />,
          },
          {
            path: "/dashboard/:id",
            element: <EditProduct />,
          },
          {
            path: "/dashboard/refund/:id",
            element: <Refund />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/process-checkout",
    element: (
      <PrivateRoutes>
        <ProcessCheckout />,
      </PrivateRoutes>
    ),
  },
]);

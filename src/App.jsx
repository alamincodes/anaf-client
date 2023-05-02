import { RouterProvider } from "react-router-dom";
import { routes } from "./components/Routes/Routes";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <div>
      <CartProvider>
        <RouterProvider router={routes} />
      </CartProvider>
      <Toaster />
    </div>
  );
}

export default App;

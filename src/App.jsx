import { RouterProvider } from "react-router-dom";
import { routes } from "./components/Routes/Routes";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "react-use-cart";
import Footer from "./components/Shared/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen md:mb-auto mb-[76px]">
      <CartProvider>
        <RouterProvider router={routes} />
      </CartProvider>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;

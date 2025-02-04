import React, { useContext, useState } from "react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import emptyCart from "../../assets/image/emptyCart.svg";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { format } from "date-fns";

const Cart = () => {
  useTitle("Cart");
  const [isLoading, setIsLoading] = useState(false);
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const { isEmpty, items, updateItemQuantity, cartTotal, removeItem } =
    useCart();

  // console.log(items);
  const dateTime = format(new Date(), "PPpp");
  const paymentMethod = "";
  const cartItems = { email: user?.email, items, dateTime, paymentMethod };
  const navigate = useNavigate();
  const handleCreateInvoice = () => {
    if (!user) {
      return navigate("/login");
    }
    setIsLoading(true);
    fetch("https://anaf-server.vercel.app/create-invoice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(cartItems),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setIsLoading(false);
        if (data.acknowledged) {
          setIsLoading(false);
          window.location.replace(
            `https://anaf-4fb1c.web.app/checkout?invoiceId=${data.insertedId}`
          );
        }
      });
  };
  return (
    <AnimatePage>
      <section className="mb-5 myContainer">
        {isEmpty ? (
          <div className="myContainer flex flex-col justify-center items-center h-[400px]">
            <div className="w-[200px] h-[200px]">
              <img src={emptyCart} alt="" />
            </div>
            <h2 className="text-2xl font-semibold ">Your cart is empty</h2>

            <Link
              to="/"
              className="px-8 py-3 mt-2 text-white rounded-sm bg-neutral-800"
            >
              <button>Continue to shopping</button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="p-5 mt-3 bg-white myContainer shadow-cardShadow rounded-xl">
              <div>
                <header className="text-left">
                  <h1 className="text-xl font-bold text-gray-900 uppercase sm:text-3xl">
                    Your Cart
                  </h1>
                  <h5 className="font-bold">
                    Total products ({items?.length})
                  </h5>
                </header>

                <div className="mt-5">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col py-6 space-y-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="object-cover w-16 h-16 max-w-full rounded-lg"
                            src={item.img}
                            alt=""
                          />
                        </div>

                        <div className="relative flex flex-col justify-between flex-1">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {item.name}
                              </p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <div className="flex items-end justify-between mt-4 sm:mt-0 sm:items-start sm:justify-end">
                              <p className="w-20 text-base font-semibold text-gray-900 shrink-0 sm:order-2 sm:ml-8 sm:text-right">
                                Tk {item.price}
                              </p>

                              <div className="sm:order-1">
                                <div className="flex items-stretch h-8 mx-auto text-gray-600">
                                  <button
                                    onClick={() =>
                                      updateItemQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                    className="flex items-center justify-center px-4 transition bg-gray-200 rounded-l-md hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  <div className="flex items-center justify-center w-full px-4 text-xs font-normal transition bg-gray-100">
                                    {item.quantity}
                                  </div>
                                  <button
                                    onClick={() =>
                                      updateItemQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                    className="flex items-center justify-center px-4 transition bg-gray-200 rounded-r-md hover:bg-black hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="flex p-2 text-center text-gray-500 transition-all duration-200 ease-in-out rounded focus:shadow hover:text-red-500"
                            >
                              <HiOutlineTrash size={22} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-end pt-8 mt-8 border-t border-gray-300">
                    <div className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-md text-gray-700">
                        <div className="flex justify-between ">
                          <dt>Subtotal</dt>
                          <dd>Tk. {cartTotal}</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>Discount</dt>
                          <dd>Tk. 0</dd>
                        </div>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>Tk. {cartTotal}</dd>
                        </div>
                      </dl>

                      <div className="flex justify-end">
                        <button
                          onClick={handleCreateInvoice}
                          className="block w-full px-20 py-3 text-center text-white bg-black rounded mb-7 md:w-auto"
                        >
                          {isLoading ? (
                            <div className="flex justify-center item-center">
                              <svg
                                className="w-5 h-5 text-white animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            </div>
                          ) : (
                            "Checkout"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </AnimatePage>
  );
};

export default Cart;

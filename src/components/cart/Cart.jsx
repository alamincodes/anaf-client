import React, { useContext } from "react";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import emptyCart from "../../assets/image/emptyCart.svg";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

const Cart = () => {
  useTitle("Cart");
  const { user } = useContext(AUTH_CONTEXT);
  const { isEmpty, items, updateItemQuantity, cartTotal, removeItem } =
    useCart();

  // console.log(items);
  const cartItems = { email: user?.email, items, };

  const handleCreateInvoice = () => {
    fetch("https://anaf-server.vercel.app/create-invoice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(cartItems),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          window.location.replace(
            `http://localhost:5173/checkout?invoiceId=${data.insertedId}`
          );
        }
      });
  };
  return (
    <AnimatePage>
      <section className="myContainer mb-5">
        {isEmpty ? (
          <div className="myContainer flex flex-col justify-center items-center h-[400px]">
            <div className="w-[200px] h-[200px]">
              <img src={emptyCart} alt="" />
            </div>
            <h2 className=" font-semibold">Your cart is empty</h2>

            <Link
              to="/"
              className=" bg-neutral-800 mt-2 text-white py-3 rounded-md px-8"
            >
              <button>Continue to shopping</button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="myContainer p-5 bg-white shadow-cardShadow rounded-xl mt-3">
              <div>
                <header className="text-left">
                  <h1 className="text-xl uppercase font-bold text-gray-900 sm:text-3xl">
                    Your Cart
                  </h1>
                </header>

                <div className="mt-5">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="h-16 w-16 max-w-full rounded-lg object-cover"
                            src={item.img}
                            alt=""
                          />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {item.name}
                              </p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                Tk {item.price}
                              </p>

                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  <button
                                    onClick={() =>
                                      updateItemQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  <div className="flex w-full items-center font-normal justify-center bg-gray-100 px-4 text-xs transition">
                                    {item.quantity}
                                  </div>
                                  <button
                                    onClick={() =>
                                      updateItemQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
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
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-red-500"
                            >
                              <HiOutlineTrash size={22} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex justify-end border-t border-gray-300 pt-8">
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
                          className="block rounded mb-7 md:w-auto w-full text-center bg-black px-5 py-3 text-white"
                        >
                          Checkout
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

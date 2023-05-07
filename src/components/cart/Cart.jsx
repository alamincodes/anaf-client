import React, { useContext, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
const Cart = () => {
  useTitle("Cart");
  const {
    isEmpty,
    emptyCart,
    totalUniqueItems,
    items,
    updateItemQuantity,
    cartTotal,
    removeItem,
  } = useCart();
  const { userFullInfo } = useContext(AUTH_CONTEXT);

  //   console.log(items);

  if (!userFullInfo.district === "Comilla") {
    for (let item of items) {
      //   console.log(item);
      item.shipping = 130;
    }
  } else {
    for (let item of items) {
      //   console.log(item);
      item.shipping = 60;
    }
  }
  return (
    <AnimatePage>
      <section>
        {isEmpty ? (
          <div className="container mx-auto flex flex-col justify-center items-center mt-20">
            <h2 className="text-3xl font-semibold">your cart is empty</h2>
            <h2 className="font-normal">
              Continue{" "}
              <Link to="/">
                <span className="text-violet-600">shopping</span>
              </Link>
            </h2>
          </div>
        ) : (
          <div>
            <div className="mx-auto con mt-3 ">
              <div className="mx-auto md:container px-2">
                <header className="text-center">
                  <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Your Cart
                  </h1>
                </header>

                <div className="mt-8">
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
                                36EU - 4US
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
                        <div className="flex justify-between">
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
                        <Link
                          to="/checkout"
                          className="block rounded bg-black px-5 py-3 text-sm text-white "
                        >
                          Checkout
                        </Link>
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

import React, { useContext, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { HiX, HiOutlineArrowNarrowRight } from "react-icons/hi";
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
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {/* <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div> */}

            <div className="mx-auto mt-8 max-w-2xl md:mt-12">
              <div className="bg-white shadow">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    <ul className="-my-8">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div className="shrink-0">
                            <img
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
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
                                className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                              >
                                <HiX size={22} />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">
                        Tk. {cartTotal}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Shipping</p>
                      <p className="text-lg font-semibold text-gray-900">130</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">
                        USD
                      </span>{" "}
                      {cartTotal + 130}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <Link to="/checkout">
                      <button
                        type="button"
                        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                      >
                        Checkout
                        <HiOutlineArrowNarrowRight className="text-2xl group-hover:translate-x-2 transition-all ml-2" />
                      </button>
                    </Link>
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

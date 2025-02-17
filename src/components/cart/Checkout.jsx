import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import { HiOutlineCheck } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import bkash from "../../assets/icons/bkash.svg";
import { TbTruckDelivery } from "react-icons/tb";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link, useLocation } from "react-router-dom";
import UpdateAddressModal from "../update-user-address/UpdateAddressModal";
import { useQuery } from "@tanstack/react-query";
import CodSuccessOrder from "../modal/CodSuccessOrder";

const Checkout = () => {
  useTitle("Checkout");
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const { items } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Bkash");
  // const [userFullInfo, setUserFullInfo] = useState({});
  const [errorMessage, setSetErrorMessage] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const location = useLocation();
  const invoiceId = location.search.split("=")[1];
  // console.log(invoiceData);
  const handleCODOrder = () => {
    setPaymentLoading(true);
    fetch("https://anaf-server.vercel.app/order/cod", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(invoiceData),
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentLoading(false);
        // console.log(data);
        if (data.acknowledged) {
          setSuccessModal(true);
        }
      })
      .catch((error) => {
        setPaymentLoading(false);
        setSetErrorMessage("Try agin something is wrong");
        // console.log(error);
      });
  };
  const handleBkashOrder = () => {
    const checkoutInfo = {
      invoiceId: invoiceId,
      callbackURL: `https://anaf-4fb1c.web.app/process-checkout?invoiceId=${invoiceId}`,
    };

    setPaymentLoading(true);
    fetch("https://anaf-server.vercel.app/payment/bkash/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(checkoutInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentLoading(false);
        // console.log(data);
        window.location.replace(data.bkashURL);
      })
      .catch((error) => {
        setPaymentLoading(false);
        setSetErrorMessage("Try agin something is wrong");
        // console.log(error);
      });
  };

  useEffect(() => {
    // setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/get-invoice/${invoiceId}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // setIsLoading(false);
        setInvoiceData(data);
      });
  }, []);

  const { data: userFullInfo = {}, isLoading } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(
        `https://anaf-server.vercel.app/users?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("accessToken");
        return logOut();
      }
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatePage>
      <section className="mb-5 myContainer">
        {items.length > 0 ? (
          <div className="flex flex-col items-start lg:flex-row lg:gap-5">
            {/* price details */}
            <div className="relative w-full col-span-4 p-4 mt-3 bg-white rounded shadow">
              {/* price details */}
              <div>
                <ul className="space-y-5">
                  {invoiceData.productsList?.map((product) => (
                    <li
                      key={product._id}
                      className="flex items-center justify-between p-2 rounded"
                    >
                      <div className="flex items-center space-x-2 ">
                        <img
                          src={product.img}
                          className="w-12 h-12 rounded"
                          alt=""
                        />

                        <div>
                          <p className="text-sm">{product.name}</p>
                          <h5 className="text-neutral-500">
                            Quantity : {product.quantity}
                          </h5>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* User order data */}
            <div className="w-full col-span-3 py-5 mt-3 bg-white rounded shadow lg:w-2/3 lg:sticky lg:top-20">
              <div className="px-4 ">
                {/* user info */}
                <div className="relative p-2 rounded bg-neutral-100">
                  {/* update address  btn*/}
                  <button
                    onClick={() => setOpenModal(true)}
                    className="absolute flex items-center px-4 py-2 text-xs text-white rounded right-2 bg-neutral-800"
                  >
                    {" "}
                    <span>
                      <HiPencilSquare size={18} className="mr-1" />
                    </span>{" "}
                    Update address
                  </button>
                  {/* ---------- */}
                  <h5 className="font-bold">Delivery Address</h5>
                  <ul>
                    <li>{userFullInfo.name}</li>
                    <li>{userFullInfo.phone}</li>
                    <li>{userFullInfo.email}</li>
                    <li>
                      {userFullInfo.district}, {userFullInfo.address}
                    </li>
                  </ul>
                </div>
                {/* <-------- total price --------> */}
                <ul className="p-5 text-[15px] bg-orange-50 border border-dashed border-orange-500 rounded mt-5">
                  <li className="flex justify-between font-semibold uppercase">
                    <span>Subtotal:</span> <span>৳ {invoiceData.subtotal}</span>
                  </li>
                  <li className="flex justify-between my-2 font-semibold uppercase">
                    <span> Delivery charge:</span>{" "}
                    <span>৳ {invoiceData.deliveryCharge}</span>
                  </li>
                  <li className="font-bold border-t border-orange-500 border-dashed ">
                    <h5 className="flex justify-between my-2 font-semibold uppercase">
                      <span>Total:</span> <span>৳ {invoiceData.total}</span>
                    </h5>
                  </li>
                </ul>
                {/* <--------------- select payment -------------->*/}
                <h2 className="mt-4 font-medium text-md">
                  Select payment method
                </h2>
                <div className="flex flex-col items-center gap-4 my-3 md:flex-row">
                  {/* Bkash payment */}
                  <div className="w-full">
                    <input
                      type="radio"
                      name="selectPayment"
                      value="Bkash"
                      id="Bkash"
                      defaultChecked
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="peer hidden [&:checked_+_label_svg]:block"
                    />

                    <label
                      htmlFor="Bkash"
                      className={`flex cursor-pointer items-center justify-between relative rounded-lg bg-white border-[2px] ${
                        paymentMethod === "Bkash"
                          ? "border-neutral-800"
                          : "border-neutral-200"
                      }  p-4 text-sm font-medium shadow-cardShadow`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`${
                            paymentMethod === "Bkash"
                              ? "bg-black"
                              : "bg-neutral-200"
                          } text-white rounded-full w-6 h-6  flex justify-center items-center`}
                        >
                          <HiOutlineCheck size={15} />
                        </span>
                        <div className="flex items-center">
                          <img src={bkash} className="w-7 h-9" alt="" />
                        </div>
                        <p className="text-gray-900">Bkash payment</p>
                      </div>
                    </label>
                  </div>
                  {/* cash on deliver */}
                  <div className="w-full">
                    <input
                      type="radio"
                      name="selectPayment"
                      value="CashOnDelivery"
                      id="Cash"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="peer hidden [&:checked_+_label_svg]:block"
                    />

                    <label
                      htmlFor="Cash"
                      className={`flex cursor-pointer items-center justify-between relative rounded-lg bg-white border-[2px] ${
                        paymentMethod === "CashOnDelivery"
                          ? "border-neutral-800"
                          : "border-neutral-200"
                      }  p-4 text-sm font-medium shadow-cardShadow`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`${
                            paymentMethod === "CashOnDelivery"
                              ? "bg-black"
                              : "bg-neutral-200"
                          } text-white rounded-full w-6 h-6  flex justify-center items-center`}
                        >
                          <HiOutlineCheck size={15} />
                        </span>

                        <p className="flex items-center text-black">
                          <TbTruckDelivery className="mr-1 w-7 h-9" /> Cash on
                          delivery
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                {errorMessage && (
                  <p className="mt-1 text-red-500">{errorMessage}</p>
                )}

                {/* <------------------- order buttons --------------->*/}
                <div className="mt-5">
                  {paymentMethod === "Bkash" ? (
                    <button
                      type="submit"
                      onClick={handleBkashOrder}
                      className="block w-full rounded bg-black p-2.5 text-lg  text-white transition hover:shadow-lg"
                    >
                      <span>
                        {paymentLoading ? (
                          <div className="flex justify-center item-center">
                            <svg
                              className="text-white h-7 w-7 animate-spin"
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
                          "Pay now"
                        )}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleCODOrder}
                      className="block w-full rounded bg-black p-2.5 text-lg  text-white transition hover:shadow-lg"
                    >
                      <span>
                        {paymentLoading ? (
                          <div className="flex justify-center item-center">
                            <svg
                              className="text-white h-7 w-7 animate-spin"
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
                          "Confirm Order"
                        )}
                      </span>
                    </button>
                  )}
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[400px]">
            <h4 className="text-2xl font-bold">No product found</h4>
            <Link to="/">
              <button className="px-6 py-2 mt-3 text-white rounded bg-neutral-800">
                Continue shopping
              </button>
            </Link>
          </div>
        )}
      </section>

      {openModal && (
        <UpdateAddressModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {successModal && (
        <CodSuccessOrder
          successModal={successModal}
          setSuccessModal={setSuccessModal}
        />
      )}
    </AnimatePage>
  );
};

export default Checkout;

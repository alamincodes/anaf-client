import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import { HiOutlineCheck } from "react-icons/hi";
import bkash from "../../assets/icons/bkash.svg";
import { TbTruckDelivery } from "react-icons/tb";
import { format } from "date-fns";
import LoadingSpinner from "../Shared/LoadingSpinner";
import OrderSuccessModal from "../orders/OrderSuccessModal";
import delivery from "../../assets/image/delivery.svg";
import { Link, useLocation } from "react-router-dom";

const Checkout = () => {
  useTitle("Checkout");
  const { user } = useContext(AUTH_CONTEXT);
  const { items, cartTotal, emptyCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Bkash");
  const [userFullInfo, setUserFullInfo] = useState({});
  const [errorMessage, setSetErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [invoiceData, setInvoiceData] = useState({});

  const location = useLocation();
  const invoiceId = location.search.split("=")[1];
  // console.log(window.location.href);
  const handleOrder = (e) => {
    e.preventDefault();
    setSetErrorMessage("");
    // const form = e.target;
    // const name = form.name.value;
    // const email = form.email.value;
    // const phone = form.phone.value;
    // const districtName = form.district.value;
    // const division = form.division.value;
    // const address = form.address.value;
    // const orderDate = format(new Date(), "PP");
    const checkoutInfo = {
      invoiceId: invoiceId,
      callbackURL: `https://anafshop.com/process-checkout?invoiceId=${invoiceId}`,
    };
    console.log(import.meta.env.VITE_SERVER_URL);
    // console.log(paymentMethod);
    // console.log(checkoutInfo);
    setIsLoading(true);
    fetch("http://localhost:5000/payment/bkash/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(checkoutInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.replace(data.bkashURL);
        // emptyCart();
        // setSuccessModal(true);
        // if (data.bkashURL) {
        //   setIsLoading(false);
        //   setOrderId(data.insertedId);
        // }
        // console.log(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setSetErrorMessage("Try agin something is wrong");
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/get-invoice/${invoiceId}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setInvoiceData(data);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/users?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserFullInfo(data);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <section className="myContainer">
        {items.length > 0 ? (
          <div className="grid lg:grid-cols-7 grid-cols-1 md:gap-3">
            {/* order details */}
            <div className="w-full col-span-3 relative rounded bg-white shadow p-4 mt-3">
              <ul className="p-5 bg-orange-50 shadow border border-dashed border-orange-500 rounded">
                <li className="font-semibold">Subtotal: {invoiceData.total}Tk</li>
                <li className="font-semibold my-2">Delivery charge: 90Tk</li>
                <li className="text-xl font-bold text-s-500 border-t border-dashed border-orange-500">
                  <h5 className="mt-1">Total: {invoiceData.total + 90}Tk</h5>
                </li>
              </ul>

              <div className="absolute left-0 bottom-0 md:block hidden">
                <img src={delivery} alt="" />
              </div>
            </div>
            {/* User order data */}
            <div className="bg-white shadow rounded py-5  col-span-4 mt-3 w-full">
              <div className="px-4 lg:px-8">
                <h4 className="text-2xl font-bold text-orange-500">Customer details</h4>
                <form onSubmit={handleOrder}>
                  <div className="flex md:flex-row flex-col gap-5">
                    <div className="w-full">
                      <label className=" text-xs font-medium text-gray-700">Name</label>

                      <input
                        type="text"
                        name="name"
                        defaultValue={user?.displayName}
                        className="mt-1 w-full  rounded-lg border-gray-200 shadow-sm p-2 border outline-none"
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-xs font-medium text-gray-700">Email</label>

                      <input
                        type="text"
                        disabled
                        name="email"
                        defaultValue={user?.email}
                        className="mt-1 w-full rounded-lg border-gray-200 shadow-sm p-2 border outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-5">
                    <div className="w-full">
                      <label className=" text-xs font-medium text-gray-700">Phone</label>

                      <input
                        type="text"
                        name="phone"
                        defaultValue={userFullInfo.phone}
                        className="mt-1 w-full rounded-lg border-gray-200 shadow-sm p-2 border outline-none"
                      />
                    </div>
                    {/* division */}
                    <div className="w-full">
                      <label className="text-xs font-medium text-gray-700">Division</label>

                      <input
                        name="division"
                        defaultValue={userFullInfo.division}
                        className="border rounded-lg outline-none font-normal shadow-sm p-2 w-full "
                      />
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col gap-5">
                    {/* district */}
                    <div className="w-full">
                      <label className=" text-xs font-medium text-gray-700">District</label>

                      <input
                        name="district"
                        defaultValue={userFullInfo.district}
                        className="border rounded-lg outline-none font-normal shadow-sm p-2 w-full "
                      />
                    </div>
                    <div className="w-full">
                      <label className=" text-xs font-medium text-gray-700">Address</label>
                      <textarea
                        type="text"
                        name="address"
                        defaultValue={userFullInfo.address}
                        rows={1}
                        className="mt-1 w-full rounded-lg border-gray-200 shadow-sm p-2 border outline-none"
                      />
                    </div>
                  </div>
                  {/* select payment */}
                  <h2 className="font-medium text-md mt-4">Select payment method</h2>
                  <div className="flex md:flex-row flex-col items-center gap-4 my-3">
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
                        className="flex cursor-pointer items-center justify-between relative rounded-lg bg-white border-[1px] border-neutral-200 p-4 text-sm font-medium shadow-cardShadow"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`${
                              paymentMethod === "Bkash" ? "bg-black" : "bg-neutral-200"
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
                        className="flex cursor-pointer items-center justify-between relative rounded-lg bg-white border-[1px] border-neutral-200 p-4 text-sm font-medium shadow-cardShadow"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`${
                              paymentMethod === "CashOnDelivery" ? "bg-black" : "bg-neutral-200"
                            } text-white rounded-full w-6 h-6  flex justify-center items-center`}
                          >
                            <HiOutlineCheck size={15} />
                          </span>

                          <p className="text-black flex items-center">
                            <TbTruckDelivery className="w-7 h-9 mr-1" /> Cash on delivery
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-10">
                    {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
                    <button
                      type="submit"
                      className="block w-full rounded bg-black p-2.5 text-lg  text-white transition hover:shadow-lg"
                    >
                      Confirm order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[400px]">
            <h4 className="font-bold text-2xl">No product found</h4>
            <Link to="/">
              <button className="bg-neutral-800 text-white py-2 px-6 rounded mt-3">Continue shopping</button>
            </Link>
          </div>
        )}
      </section>
      {successModal && <OrderSuccessModal orderId={orderId} />}
    </AnimatePage>
  );
};

export default Checkout;

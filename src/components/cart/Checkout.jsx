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
  const { items } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Bkash");
  const [userFullInfo, setUserFullInfo] = useState({});
  const [errorMessage, setSetErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});

  const location = useLocation();
  const invoiceId = location.search.split("=")[1];

  const handleOrder = () => {
    const checkoutInfo = {
      invoiceId: invoiceId,
      callbackURL: `https://anafshop.com/process-checkout?invoiceId=${invoiceId}`,
    };

    setIsLoading(true);
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
        console.log(data);
        window.location.replace(data.bkashURL);
      })
      .catch((error) => {
        setIsLoading(false);
        setSetErrorMessage("Try agin something is wrong");
        console.log(error);
      });
  };

  useEffect(() => {
     setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/get-invoice/${invoiceId}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
         setIsLoading(false);
        setInvoiceData(data);
      });
  }, []);
  useEffect(() => {
     setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserFullInfo(data);
         setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <section className="myContainer mb-5">
        {items.length > 0 ? (
          <div className="flex items-start md:flex-row flex-col md:gap-5">
            {/* price details */}
            <div className="w-full col-span-4 relative rounded bg-white shadow p-4 mt-3">
              {/* price details */}
              <div>
                <ul className="space-y-5">
                  {invoiceData.productsList?.map((product) => (
                    <li
                      key={product._id}
                      className="flex justify-between items-center p-2 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <img src={product.img[0]} className="w-10" alt="" />
                        <h3 className="font-medium">{product.name}</h3>
                      </div>
                      <h3>x{product.quantity}</h3>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="p-5 bg-orange-50 shadow border border-dashed border-orange-500 rounded mt-5">
                <li className="font-semibold flex justify-between">
                  <span>Subtotal:</span> <span>Tk. {invoiceData.total}</span>
                </li>
                <li className="font-semibold flex justify-between my-2">
                  <span> Delivery charge:</span>{" "}
                  <span>TK. {invoiceData.deliveryCharge}</span>
                </li>
                <li className="text-xl font-bold text-s-500 border-t border-dashed border-orange-500">
                  <h5 className="mt-1 text-right">
                    Total: {invoiceData.total} .Tk
                  </h5>
                </li>
              </ul>
            </div>
            {/* User order data */}
            <div className="bg-white shadow rounded py-5 col-span-3 mt-3 w-2/3">
              <div className="px-4 lg:px-8">
                <h4 className="text-2xl font-bold text-orange-500">
                  Customer details
                </h4>
                {/* user info */}
                <div className="bg-neutral-100 p-2 rounded">
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
                {/* select payment */}
                <h2 className="font-medium text-md mt-4">
                  Select payment method
                </h2>
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
                      className="flex cursor-pointer items-center justify-between relative rounded-lg bg-white border-[1px] border-neutral-200 p-4 text-sm font-medium shadow-cardShadow"
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

                        <p className="text-black flex items-center">
                          <TbTruckDelivery className="w-7 h-9 mr-1" /> Cash on
                          delivery
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-red-500 mt-1">{errorMessage}</p>
                )}
                <div className="mt-5">
                  <button
                    type="submit"
                    onClick={handleOrder}
                    className="block w-full rounded bg-black p-2.5 text-lg  text-white transition hover:shadow-lg"
                  >
                    {paymentMethod === "Bkash" ? "Pay now" : "Confirm order"}
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[400px]">
            <h4 className="font-bold text-2xl">No product found</h4>
            <Link to="/">
              <button className="bg-neutral-800 text-white py-2 px-6 rounded mt-3">
                Continue shopping
              </button>
            </Link>
          </div>
        )}
      </section>
    </AnimatePage>
  );
};

export default Checkout;

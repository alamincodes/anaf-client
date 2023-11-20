import React, { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import failedAnimationIcon from "./animationJson/fail.json";
import SuccessPayment from "./SuccessPayment";
import { Link } from "react-router-dom";
import ExecuteLoading from "./ExecuteLoading";
import { useCart } from "react-use-cart";

const ProcessCheckout = () => {
  const { emptyCart } = useCart();
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const status = queryParams.get("status");
  const paymentID = queryParams.get("paymentID");
  const invoiceID = queryParams.get("invoiceId");
  const [message, setMessage] = useState("");
  const [successPaymentData, setSuccessPaymentData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(successPaymentData);

  const failAnimation = {
    animationData: failedAnimationIcon,
    loop: false,
  };

  const { View } = useLottie(failAnimation);

  useEffect(() => {
    const bkashExecBody = {
      paymentID: paymentID,
      invoiceID: invoiceID,
    };

    if (status === "success") {
      setIsLoading(true);
      // console.log("success");
      fetch("https://anaf-server.vercel.app/payment/bkash/execute", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(bkashExecBody),
      })
        .then((res) => res.json())
        .then((json) => {
          setIsLoading(false);
          if (json.status === "SUCCESS") {
            setSuccessPaymentData(json);
            emptyCart();
            // successfully paid
            // show that payment is paid in UI
            // clear cart
            setIsLoading(false);
            setMessage(json.message);
            console.log(json.message);
          } else {
            // show the error
            setMessage(json.message);
            setIsLoading(false);
            setSuccessPaymentData(json);
          }
          console.log(json);
        });
      return;
    }
    console.log(status);
    // failed / cancelled
    setMessage("The payment was " + status);
  }, []);

  if (isLoading) {
    return <ExecuteLoading />;
  }

  return (
    <section>
      <div className="myContainer">
        {/* success */}
        {successPaymentData?.paymentData?.statusCode === "0000" && (
          <SuccessPayment successPaymentData={successPaymentData} />
        )}

        {/* cancel */}
        {status === "cancel" && (
          <div className="flex justify-center items-center flex-col bg-white shadow md:p-5 p-4 text-center m-5">
            <h4 className="md:w-[120px] h-20 md:mb-10 mb-5">{View}</h4>
            <h3 className="text-red-600 font-bold md:text-5xl text-2xl my-5 uppercase">
              {message}
            </h3>
            <p className="font-secondary text-lg">
              আপনার পেমেন্টি বাতিল হয়েছে, দয়া করে আবার চেষ্টা করুন।
            </p>
            <Link to="/cart">
              <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
                Try again
              </button>
            </Link>
          </div>
        )}
        {/* cancel */}
        {successPaymentData?.paymentData?.statusCode === "2062" && (
          <div className="flex justify-center items-center flex-col bg-white shadow md:p-5 p-4 text-center m-5">
            <h3 className="text-green-600 font-bold md:text-3xl text-2xl my-5 uppercase">
              The payment has already been completed
            </h3>

            <Link to="/cart">
              <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
                Try again
              </button>
            </Link>
          </div>
        )}
        {/* failed */}
        {status === null && (
          <div className="flex justify-center items-center flex-col bg-white shadow md:p-5 p-4 text-center m-5">
            <h4 className="md:w-[120px] h-20 md:mb-10 mb-5">{View}</h4>
            <h3 className="text-red-600 font-bold md:text-5xl text-2xl my-5 uppercase">
              {message}
            </h3>
            <p className="font-secondary text-lg">
              আপনার পেমেন্টি বাতিল হয়েছে, দয়া করে আবার চেষ্টা করুন।
            </p>
            <Link to="/cart">
              <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
                Try again
              </button>
            </Link>
          </div>
        )}
        {/* failed */}
        {status === "failure" && (
          <div className="flex justify-center items-center flex-col bg-white shadow md:p-5 p-4 text-center m-5">
            <h4 className="md:w-[120px] h-20 md:mb-10 mb-5">{View}</h4>
            <h3 className="text-red-600 font-bold md:text-5xl text-xl my-3 uppercase">
              The payment has failed
            </h3>
            <p className="font-secondary text-lg">
              আপনার পেমেন্টি বাতিল হয়েছে, দয়া করে আবার চেষ্টা করুন।
            </p>
            <Link to="/cart">
              <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
                Try again
              </button>
            </Link>
          </div>
        )}
        {/* failed */}
        {successPaymentData?.paymentData?.statusCode === "2023" && (
          <div className="flex justify-center items-center flex-col bg-white shadow md:p-5 p-4 text-center m-5">
            <h3 className="text-red-600 font-bold md:text-5xl text-xl my-3 uppercase">
              {successPaymentData?.message}
            </h3>
            <p className="font-secondary text-lg">
              আপনার একাউন্টে পর্যাপ্ত পরিমাণ ব্যালেন্স নেই।
            </p>
            <Link to="/cart">
              <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
                Try again
              </button>
            </Link>
          </div>
        )}
        {/* DUPLICATE FOR ALL TRANSACTIONS*/}
        {successPaymentData?.paymentData?.statusCode === "2029" && (
          <div className="flex justify-center items-center flex-col bg-white shadow md:p-5 p-4 text-center m-5">
            <h3 className="text-red-600 font-bold md:text-5xl text-xl my-3 uppercase">
              {successPaymentData?.message}
            </h3>
            <Link to="/cart">
              <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
                Try again
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessCheckout;

import React, { useEffect, useState } from "react";
import { useLottie } from "lottie-react";

import failedAnimationIcon from "./animationJson/fail.json";
import SuccessPayment from "./SuccessPayment";
import { Link } from "react-router-dom";
import ExecuteLoading from "./ExecuteLoading";
const ProcessCheckout = () => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const status = queryParams.get("status");
  const paymentID = queryParams.get("paymentID");
  const invoiceID = queryParams.get("invoiceId");

  const [message, setMessage] = useState("");
  const [successPaymentData, setSuccessPaymentData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
          if (json.status == "SUCCESS") {
            setSuccessPaymentData(json);
            // successfully paid
            // show that paymenet is paid in UI
            // clear cart
            setMessage("Payment done, fucking alamin!");
          } else {
            // show the error
            setMessage(json.message);
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
        {/* <div>{message}</div> */}

        {/* success */}
        {status === "success" && (
          <SuccessPayment successPaymentData={successPaymentData} />
        )}

        {/* cancel */}
        {status === "cancel" && (
          <div className="flex justify-center items-center flex-col bg-white shadow p-5 text-center m-5">
            <h4 className="md:w-[100px] h-20 mb-10">{View}</h4>
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
        {status === null && (
          <div className="flex justify-center items-center flex-col bg-white shadow p-5 text-center m-5">
            <h4 className="md:w-[100px] h-20 mb-10">{View}</h4>
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
      </div>
    </section>
  );
};

export default ProcessCheckout;

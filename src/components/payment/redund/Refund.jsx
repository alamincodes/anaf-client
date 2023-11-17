import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import toast from "react-hot-toast";

const Refund = () => {
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const handleRefund = (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = form.amount.value;
    const trxID = form.trxID.value;
    const paymentID = form.paymentID.value;
    const refundData = {
      amount,
      trxID,
      paymentID,
    };
    // console.log(refundData);
    setRefundLoading(true);
    setErrorMessage("")
    fetch("https://anaf-server.vercel.app/payment/bkash/refund", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(refundData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefundLoading(false);
        if (data.statusCode === "2034") {
          setErrorMessage("Already refund");
        }
        if (data.statusCode === "2023") {
          setErrorMessage("Insufficient Balance");
        }
        if (data.statusCode === "0000") {
          setSuccessMessage("Successfully refunded✅");
          const orderStatus = {
            status: `Refunded-(${data.refundTrxID})`,
          };

          fetch(
            `https://anaf-server.vercel.app/order-payment-status/${orderDetail._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(orderStatus),
            }
          )
            .then((res) => {
              if (res.status === 401 || res.status === 403) {
                localStorage.removeItem("accessToken");
                return logOut();
              }
              return res.json();
            })
            .then((data) => {
              console.log(data);
              toast.success("Successfully refunded");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setRefundLoading(false);
        setErrorMessage("Server problem");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/order/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setOrderDetail(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <section className="my-5">
      <div className="flex justify-center items-center flex-col">
        <div className="bg-neutral-200 md:w-96 w-full p-5">
          <h3 className="text-xl font-bold">
            Order ID: {orderDetail.orderId}{" "}
          </h3>
          <h3>Customer Name: {orderDetail.userData?.name}</h3>
        </div>
        <form onSubmit={handleRefund} className="flex flex-col md:w-96 w-full">
          <label htmlFor="">amount</label>
          <input
            type="text"
            placeholder="amount"
            name="amount"
            defaultValue={orderDetail.paymentData?.amount}
            className="py-2 border outline-none rounded px-2"
          />
          <label htmlFor="">trxID</label>
          <input
            type="text"
            placeholder="trxID"
            name="trxID"
            defaultValue={orderDetail.paymentData?.trxID}
            className="py-2 border outline-none rounded px-2"
          />
          <label htmlFor="">paymentID</label>
          <input
            type="text"
            placeholder="paymentID"
            name="paymentID"
            defaultValue={orderDetail.paymentData?.paymentID}
            className="py-2 border outline-none rounded px-2"
          />
          {errorMessage && (
            <p className="bg-red-700 text-white p-2 my-2 rounded">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="bg-green-700 text-white p-2 my-2 rounded">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            className="bg-neutral-800 py-2 rounded text-white mt-2"
          >
            {refundLoading ? "refunding..." : "Refund"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Refund;

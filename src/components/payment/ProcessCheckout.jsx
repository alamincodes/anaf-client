import React, { useEffect, useState } from "react";

const ProcessCheckout = () => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const status = queryParams.get("status");
  const paymentID = queryParams.get("paymentID");
  const invoiceID = queryParams.get("invoiceId");

  const [message, setMessage] = useState("Wait, we are processing your payment.");
  useEffect(() => {
    const bkashExecBody = {
      paymentID: paymentID,
      invoiceID: invoiceID,
    };

    if (status === "success") {
      console.log("success");
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
          if (json.status == "SUCCESS") {
            // successfully paid
            // show that paymenet is paid in UI
            // clear cart
            setMessage("Payment done, fucking alamin!");
          } else {
            // show the error
            setMessage(json.message);
          }
          console.log(json);
        });
      return;
    }

    // failed / cancelled
    setMessage("The payment was " + status);
  }, []);

  return <div>{message}</div>;
};

export default ProcessCheckout;

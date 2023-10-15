import React from "react";

const ProcessCheckout = () => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const status = queryParams.get("status");
  const paymentID = queryParams.get("paymentID");
  console.log(paymentID, status);

  const obj = {
    hello: "hello",
  };
  if (status === "success") {
    console.log("success");
    fetch("something", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  } else {
    console.log("cancel");
  }
  return <div>success</div>;
};

export default ProcessCheckout;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";

const OrderDetails = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();
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
    <AnimatePage>
      <div className="myContainer bg-white md:px-20 md:py-10">
        <h2 className="md:text-3xl text-2xl font-bold text-left uppercase">
          Order Details
        </h2>
        <h2 className="font-medium mt-5 shadow-primary border rounded p-2">
          Order{" "}
          <span className="bg-gray-100 font-bold md:text-sm text-xs p-1 uppercase">
            #{orderDetail._id}
          </span>{" "}
          was placed on {orderDetail.orderDate} and is currently{" "}
          <span className="bg-gray-100 p-1 capitalize font-bold">
            {orderDetail.status ? orderDetail.status : "pending"}
          </span>
        </h2>
        <div className="mt-5">
          {orderDetail.items?.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded mt-2 py-5 px-3"
            >
              <div className="flex md:items-center items-start justify-between md:flex-row flex-col md:text-center items-left space-y-2">
                <img
                  src={item.img}
                  alt=""
                  className="w-20 h-20 bg-cover rounded-md"
                />
                <h2>
                  {item.name}{" "}
                  <span className="font-semibold">X {item.quantity} </span>
                </h2>
                <h2 className="uppercase font-semibold">
                  Price: {item.price} Tk
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-3 shadow gap-0">
          {/* total */}
          <div className="shadow-sm border border-dashed p-5">
            <h2 className="font-bold uppercase">Total Amount</h2>
            <h2>Subtotal: {orderDetail.cartTotal} Tk</h2>
            <h2>Delivery fee: 120 Tk</h2>
            <h2 className="font-semibold text-purple-500">
              Total: {orderDetail.total} Tk
            </h2>
          </div>
          {/* total */}
          <div className="shadow-sm border border-dashed  p-5">
            <h2 className="font-bold uppercase">Payment details</h2>
            <h2>Payment type: {orderDetail.selectPaymentType}</h2>
            <h2>Payment method: {orderDetail.payWith} </h2>
            <h2>Transaction Id: {orderDetail.transactionId}</h2>
            <h2 className="font-semibold text-purple-500">
              Pay:{" "}
              {orderDetail.selectPaymentType === "Cash on delivery"
                ? "200"
                : orderDetail.total}
              Tk
            </h2>
          </div>

          {/* billing address */}

          <div className="shadow-sm border border-dashed p-5">
            <h2 className="font-bold uppercase">BILLING ADDRESS</h2>
            <h3>{orderDetail.name}</h3>
            <h3>{orderDetail.phone}</h3>
            <h3>{orderDetail.email}</h3>
            <h3>{orderDetail.address}</h3>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default OrderDetails;

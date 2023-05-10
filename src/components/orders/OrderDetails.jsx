import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";

const OrderDetails = () => {
  const { user } = useContext(AUTH_CONTEXT);
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderDetail(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <div>
        <div className="container mx-auto bg-white md:p-24">
          <h2 className="text-3xl font-bold text-center">Your order</h2>
          <h2 className="text-2xl mt-4">Hi, {user?.displayName}</h2>
          <h2 className="my-2">
            Your order has been confirmed and will be shipping soon.
          </h2>
          <div className="space-y-2 border-b">
            <h2>
              <span className="uppercase font-medium">Order id:</span>{" "}
             <span className="text-gray-500"> {orderDetail._id}</span>
            </h2>
            <h2>
              <span className="uppercase font-medium">Order date: </span>{" "}
             <span className="text-gray-600"> {orderDetail.orderDate}</span>
            </h2>
            <h2>
              {" "}
              <span className="uppercase font-medium">Payment type: </span>{" "}
              <span className="text-gray-600">{orderDetail.selectPaymentType}</span>
            </h2>
            <h2>
              {" "}
              <span className="uppercase font-medium">Address: </span>{" "}
              <span className="text-gray-600">{orderDetail.address}</span>
            </h2>
            <h2>
              {" "}
              <span className="uppercase font-medium">
                Transaction Id:{" "}
              </span>{" "}
              <span className="text-gray-500">{orderDetail.transactionId}</span>
            </h2>
          </div>

          <div>
            {orderDetail.items?.map((item) => (
              <div key={item.id} className="flex justify-between md:flex-row flex-col border-b py-2">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
                    alt=""
                    className="w-20 h-20 bg-cover rounded-md"
                  />
                  <h2>{item.name}</h2>
                </div>
                <div className="flex items-center space-x-5">
                  <h2>Quantity: {item.quantity}</h2>
                  <h2>Price: {item.price} Tk</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right py-2 space-y-4">
            <div className="flex justify-end items-center space-x-28">
              <h2>Subtotal : </h2>
              <h2>{orderDetail.discountTotal} Tk</h2>
            </div>
            <div className="flex justify-end items-center space-x-28">
              <h2>Delivery fee : </h2>
              <h2>{orderDetail.deliveryFee} Tk</h2>
            </div>
            <div className="flex justify-end items-center space-x-28 border-t">
              <h2>Total payable : </h2>
              <h2>{orderDetail.total} TK</h2>
            </div>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default OrderDetails;

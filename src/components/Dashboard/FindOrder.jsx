import React, { useEffect, useState } from "react";
import { MdFindInPage } from "react-icons/md";
import {
  IoMailUnreadOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoCallOutline,
} from "react-icons/io5";
import LoadingSpinner from "../Shared/LoadingSpinner";
const FindOrder = () => {
  const [id, setId] = useState("");
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    const productId = e.target.productId.value;
    setId(productId);
    console.log(orderDetail);
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/find/${id}`, {
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderDetail(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [id]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex md:flex-row flex-col items-center gap-2"
      >
        <input
          type="text"
          name="productId"
          placeholder="id"
          className="mt-1 w-full border-gray-200 rounded shadow-sm p-2 border outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center text-sm md:w-auto w-full rounded bg-black text-white mt-1 p-[10px]"
        >
          <span>
            {" "}
            <MdFindInPage size={20} className="mr-1" />
          </span>{" "}
          Find <span className="ml-1">order</span>{" "}
        </button>
      </form>

      <div>
        <div className="flex justify-between gap-2 md:flex-row flex-col bg-white md:px-5 px-2 md:py-10">
          <div className="shadow-lg md:p-4 py-2 px-2 rounded-md">
            <h2 className="text-2xl font-bold text-center">Customer</h2>
            <div className="font-semibold flex flex-col mt-4 space-y-4 ">
              <h4 className="inline-flex items-center">
                {" "}
                <span>
                  <IoPersonOutline size={20} className="mr-1" />
                </span>{" "}
                {orderDetail.name}
              </h4>
              <h4 className=" inline-flex items-center">
                <span>
                  <IoMailUnreadOutline size={20} className="mr-1" />
                </span>{" "}
                {orderDetail.email}
              </h4>
              <h4 className=" inline-flex items-center">
                <span>
                  <IoLocationOutline size={23} className="mr-1" />
                </span>{" "}
                {orderDetail.address}
              </h4>
              <h4 className=" inline-flex items-center">
                <span>
                  <IoLocationOutline size={23} className="mr-1" />
                </span>{" "}
                {orderDetail.districtName}
              </h4>
              <h4 className=" inline-flex items-center">
                <span>
                  <IoLocationOutline size={23} className="mr-1" />
                </span>{" "}
                {orderDetail.division}
              </h4>
              <h4 className=" inline-flex items-center">
                <span>
                  <IoLocationOutline size={23} className="mr-1" />
                </span>{" "}
                {orderDetail.phone}
              </h4>
            </div>
          </div>

          <div className="shadow-md md:p-4 p-2 ">
            <h2 className="text-2xl text-center font-bold">Order Detail</h2>
            <div className="mt-4 space-y-3">
              <h2 className="uppercase font-semibold">
                Order id: <span className="text-xs">{orderDetail._id}</span>{" "}
              </h2>
              <h2 className="uppercase font-semibold ">
                Status:{" "}
                <span className="bg-gray-200 text-xs p-2 rounded-sm">
                  {orderDetail.status ? orderDetail.status : "pending"}
                </span>{" "}
              </h2>
              <h2 className="uppercase font-semibold">
                payment type: <span className="text-xs">{orderDetail.selectPaymentType}</span>
              </h2>
              <h2 className="uppercase font-semibold">
                payment with: {orderDetail.payWith}
              </h2>
              <h2>
                <span className="uppercase font-semibold">Transaction Id:</span>{" "}
                {orderDetail.transactionId}
              </h2>
            
            </div>
          </div>

          <div>
            <div className="mt-5 ">
              {orderDetail.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between  md:flex-row flex-col bg-gray-50 rounded mt-2 py-5 px-3 "
                >
                  <div className="flex items-center">
                    <img
                      src={item.img}
                      alt=""
                      className="w-20 h-20 bg-cover rounded-md"
                    />
                    <h2 className="ml-2">{item.name}</h2>
                  </div>
                  <div className="flex items-center font-semibold ml-2 space-x-5">
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
              <div className="flex justify-end items-center space-x-28 border-t font-medium">
                <h2>Total payable : </h2>
                <h2>{orderDetail.total} TK</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindOrder;

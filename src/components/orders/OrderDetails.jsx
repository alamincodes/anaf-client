import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";

const OrderDetails = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    productsList,
    orderId,
    dateTime,
    userData,
    status,
    deliveryCharge,
    subtotal,
    total,
    paymentMethod,
    paymentData,
  } = orderDetail;
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
      <div className="myContainer bg-white md:px-10 py-5 mb-5">
        <h2 className="md:text-3xl text-2xl font-bold text-left uppercase">
          Order Details
        </h2>
        {/* <h2 className="font-medium md:mt-5 mt-2 text-orange-500 bg-orange-50 border border-orange-300 rounded p-2">
          Order{" "}
          <span className="text-black font-bold p-1 uppercase">
            #{orderDetail.orderId}
          </span>{" "}
          was placed on {orderDetail.orderDate} and is currently{" "}
          <span className="text-black p-1 font-bold">
            {orderDetail.status ? orderDetail.status : "pending"}
          </span>
        </h2> */}
        <div className="mt-4 flex justify-between flex-col md:flex-row">
          <ul>
            <li className="uppercase">
              <h5 className="font-bold text-xl">OrderID #{orderId}</h5>
            </li>
            <li>{userData?.name}</li>
            <li>{userData?.email}</li>
            <li>{userData?.phone}</li>
            <li>
              {userData?.district}, {userData?.address}
            </li>
          </ul>
          <ul>
            <li className="uppercase">
              <h5 className="font-bold text-xl">Payment Details</h5>
            </li>

            <li>{dateTime}</li>
            <li>Payment method: {paymentMethod}</li>
            {paymentData?.trxID && <li>TransactionID: {paymentData?.trxID}</li>}
            <li>Status: {status}</li>
          </ul>
        </div>
        <div className="mt-5">
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right bg-neutral-200">
                <tr>
                  <th className="whitespace-nowrap text-left px-4 py-2 font-medium text-gray-900">
                    No
                  </th>
                  <th className="whitespace-nowrap text-left px-4 py-2 font-medium text-gray-900">
                    Product
                  </th>
                  <th className="whitespace-nowrap text-left px-4 py-2 font-medium text-gray-900">
                    Quantity
                  </th>
                  <th className="whitespace-nowrap text-left px-4 py-2 font-medium text-gray-900">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {productsList?.map((order, i) => (
                  <tr key={order._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {i + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {order.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {order.quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      ৳{order.quantity * order.price}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-right">
                    Subtotal
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-l">
                    ৳ {subtotal}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-right">
                    Delivery Charge
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-l">
                    ৳ {deliveryCharge}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-right">
                    Total
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 border-l">
                    ৳ {total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* <button onClick={() => window.print()}>Print</button> */}
      </div>
    </AnimatePage>
  );
};

export default OrderDetails;

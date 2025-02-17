import React, { useContext, useEffect, useRef, useState } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { HiChevronRight } from "react-icons/hi";
import useTitle from "../../hooks/useTitle";
import emptyBox from "../../assets/image/box.svg";

const Orders = () => {
  useTitle("Orders");
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/order?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((ordersData) => {
        // console.log(ordersData);
        setOrders(ordersData?.reverse());
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      {orders.length === 0 ? (
        <div className="myContainer flex justify-center items-center flex-col h-[400px]">
          <div className="w-[150px] h-[150px] bg-[#a3a3a32f] p-5 rounded-full">
            <img src={emptyBox} alt="" />
          </div>
          <div className="flex flex-col items-center font-semibold md:text-4xl text-2xl mt-2">
            <h2 className="mb-3">No order found</h2>
            <Link
              to="/"
              className="text-white ml-2 py-2 px-8 rounded-sm bg-neutral-800 "
            >
              <span className="inline-flex items-center">
                Back to home <HiChevronRight size={20} />
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="myContainer mt-2 mb-5">
          <div className="bg-white shadow-cardShadow rounded-xl md:p-5 p-2">
            <h2 className="text-2xl uppercase font-bold mb-2">My order </h2>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light border-2">
                      <thead className="border-b bg-white font-medium uppercase">
                        <tr>
                          {/* <th scope="col" className="px-6 py-4">
                          No.
                        </th> */}

                          <th scope="col" className="px-6 py-4">
                            #Order
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Product <span className="ml-1">name</span>
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Total
                          </th>
                          <th scope="col" className="px-6  py-4">
                            status
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Action
                          </th>
                          {/* <th scope="col" className="px-6 ">
                          Invoice
                        </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, i) => (
                          <tr
                            key={order._id}
                            className="border-b odd:bg-gray-100 font-medium"
                          >
                            <td
                              className="whitespace-nowrap px-6 py-4 font-medium"
                              title={order._id}
                            >
                              #{order.orderId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.dateTime}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order?.productsList[0].name.length > 15 ? (
                                <h5>
                                  {order?.productsList[0]?.name.substr(0, 15) +
                                    "..."}
                                </h5>
                              ) : (
                                <h5>{order?.productsList[0]?.name}</h5>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.total}Tk
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 ">
                              <button
                                className={`${
                                  order.status === "PAID" ||
                                  order.status === "PAID-COD"
                                    ? "bg-green-700"
                                    : "bg-purple-700"
                                } px-2 py-1 text-xs rounded-full text-white uppercase`}
                              >
                                {order.status
                                  ? order.status.includes("Refunded")
                                    ? "Refund"
                                    : order.status
                                  : "Pending"}
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <Link to={`/order/${order._id}`}>
                                <button className="bg-orange-600 text-white py-2 px-4 rounded">
                                  View
                                </button>
                              </Link>
                            </td>
                            {/* <td className="whitespace-nowrap px-6 py-4">
                            <Link to={`/invoice/${order._id}`}>
                              <button>Invoice</button>
                            </Link>
                          </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePage>
  );
};

export default Orders;

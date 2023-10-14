import React, { useContext, useEffect, useRef, useState } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { HiChevronRight } from "react-icons/hi";
import useTitle from "../../hooks/useTitle";
import emptyBox from "../../assets/image/box.svg";
import BottomNav from "../Shared/BottomNav";
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
          <div className="w-[200px] h-[200px]">
            <img src={emptyBox} alt="" />
          </div>
          <div className="flex flex-col items-center font-medium mt-2">
            <h2 className="mb-3">No order found</h2>
            <Link
              to="/"
              className="text-white ml-2 py-2 px-8 rounded-md bg-neutral-800 "
            >
              <span className="inline-flex items-center">
                Back to home <HiChevronRight size={20} />
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="myContainer mt-2">
          <div className="bg-white shadow-cardShadow rounded-xl md:p-5 p-2">
            <h2 className="text-2xl uppercase font-bold mb-2">My orders</h2>
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
                            {/* <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <h2>{i + 1}</h2>
                          </td> */}

                            <td
                              className="whitespace-nowrap px-6 py-4 font-medium"
                              title={order._id}
                            >
                              #{order.orderId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.orderDate}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.items[0]?.name.length > 25
                                ? order.items[0]?.name.substr(0, 20) + "..."
                                : order.items[0]?.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.total}Tk
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 ">
                              {order.status ? (
                                <>
                                  {order.status === "Handover to Courier" && (
                                    <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full ">
                                      {order.status ? order.status : "Pending"}
                                    </span>
                                  )}
                                  {order.status === "processing" && (
                                    <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full ">
                                      {order.status ? order.status : "Pending"}
                                    </span>
                                  )}
                                  {order.status === "pending" && (
                                    <span className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full ">
                                      {order.status ? order.status : "Pending"}
                                    </span>
                                  )}
                                  {order.status === "receive" && (
                                    <span className="bg-sky-200 text-sky-800 px-4 py-2 rounded-full ">
                                      {order.status ? order.status : "Pending"}
                                    </span>
                                  )}
                                  {order.status === "cancel" && (
                                    <span className="bg-red-200 text-red-800 px-4 py-2 rounded-full ">
                                      {order.status ? order.status : "Pending"}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="bg-yellow-200 px-4 py-2 rounded-full text-yellow-800">
                                  {order.status ? order.status : "Pending"}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <Link to={`/order/${order._id}`}>
                                <span className="text-blue-500"> View</span>
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

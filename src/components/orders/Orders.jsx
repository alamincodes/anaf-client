import React, { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";
import emptyBox from "../../assets/image/emptyBox.png";
import useTitle from "../../hooks/useTitle";
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
        console.log(ordersData);
        setOrders(ordersData.reverse());
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      {orders.length > 0 ? (
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b bg-white font-medium ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          View order
                        </th>
                        <th scope="col" className="px-6 py-4">
                          #Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Order status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b odd:bg-gray-100 font-medium"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <Link to={`/order/${order._id}`}>
                              <span className="border p-2 text-xs border-black hover:bg-black hover:text-white transition-all">
                                {" "}
                                View order
                              </span>
                            </Link>
                          </td>

                          <td
                            className="whitespace-nowrap px-6 py-4 font-medium"
                            title={order._id}
                          >
                            {order._id.slice(0, 5)}...
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {order.orderDate}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {order.items[0]?.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {order.discountTotal}Tk
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {order.status ? (
                              <>
                                {order.status === "completed" && (
                                  <span className="bg-green-200 text-green-800 p-2 rounded-sm ">
                                    {order.status ? order.status : "Pending"}
                                  </span>
                                )}
                                {order.status === "processing" && (
                                  <span className="bg-purple-200 text-purple-800 p-2 rounded-sm ">
                                    {order.status ? order.status : "Pending"}
                                  </span>
                                )}
                                {order.status === "pending" && (
                                  <span className="bg-yellow-200 text-yellow-800 p-2 rounded-sm ">
                                    {order.status ? order.status : "Pending"}
                                  </span>
                                )}
                                {order.status === "receive" && (
                                  <span className="bg-sky-200 text-sky-800 p-2 rounded-sm ">
                                    {order.status ? order.status : "Pending"}
                                  </span>
                                )}
                                {order.status === "cancel" && (
                                  <span className="bg-red-200 text-red-800 p-2 rounded-sm ">
                                    {order.status ? order.status : "Pending"}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="bg-yellow-200 p-2 rounded-sm text-yellow-800">
                                {order.status ? order.status : "Pending"}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex justify-center items-center flex-col mt-20">
          <img src={emptyBox} className="w-20 h-20" alt="" />
          <h2 className="text-medium text-2xl">No orders</h2>
          <Link to="/">
            <button className="bg-black text-white p-2 px-6 rounded mt-10">
              Home
            </button>
          </Link>
        </div>
      )}
    </AnimatePage>
  );
};

export default Orders;

import React, { useContext, useEffect, useRef, useState } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { BsBoxSeam } from "react-icons/bs";
import { HiArrowSmRight } from "react-icons/hi";
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
        // console.log(ordersData);
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
        <div className="md:container md:mx-auto md:px-0 px-2">
          <h2 className="text-2xl uppercase font-bold my-2">My orders</h2>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light border-4">
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
                            {order._id.slice(0, 5)}...
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
                                  <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full ">
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
      ) : (
        <div className="container mx-auto flex justify-center items-center flex-col mt-52">
          <BsBoxSeam size={50} />
          <div className="inline-flex font-medium items-center mt-4">
            <h2 className="">No orders</h2>
            <Link to="/" className="text-purple-500 ml-2">
              <span className="inline-flex items-center">
                Back to home <HiArrowSmRight size={20} />
              </span>
            </Link>
          </div>
        </div>
      )}
    </AnimatePage>
  );
};

export default Orders;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { GrUpdate } from "react-icons/gr";
import AnimatePage from "../Shared/AnimatePage";

const AllOrders = () => {
  const { logOut } = useContext(AUTH_CONTEXT);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    const status = e.target.orderStatus.value;
    const orderStatus = {
      status,
    };
    // console.log(orderId);
    // console.log(status);
    fetch(`https://anaf-server.vercel.app/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(orderStatus),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    // setIsLoading(true);
    fetch("https://anaf-server.vercel.app/orders", {
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
      .then((data) => {
        // console.log(data);
        setOrders(data.reverse());
        setIsLoading(false);
      });
  }, [orders]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <div>
        <div>
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
                          Order status
                        </th>
                        <th scope="col" className="px-6 flex items-center py-4">
                          Product <span className="ml-1">name</span>
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Update
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order) => (
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
                          <td className="whitespace-nowrap px-6 py-4">
                            {order?.items[0]?.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {order.discountTotal}Tk
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {order.orderDate}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <form
                              className="flex items-center"
                              onSubmit={handleUpdate}
                            >
                              <select
                                name="orderStatus"
                                className="p-2 outline-none"
                              >
                                <option value="receive">receive</option>
                                <option value="processing">processing</option>
                                <option value="completed">completed</option>
                                <option value="pending">pending</option>
                                <option value="cancel">cancel</option>
                              </select>

                              <button
                                type="submit"
                                onClick={() => setOrderId(order._id)}
                                className="ml-2 bg-slate-200 rounded-full p-1 px-2 flex items-center"
                              >
                                <GrUpdate className="mx-2 text-whit " />
                                update
                              </button>
                            </form>
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
      </div>
    </AnimatePage>
  );
};

export default AllOrders;

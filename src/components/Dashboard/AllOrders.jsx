import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { TbSettingsFilled, TbTrashFilled } from "react-icons/tb";
import AnimatePage from "../Shared/AnimatePage";
import useTitle from "../../hooks/useTitle";
import { toast } from "react-hot-toast";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

import { useQuery } from "@tanstack/react-query";

const AllOrders = () => {
  useTitle("Admin order");
  const { logOut } = useContext(AUTH_CONTEXT);
  const [orderId, setOrderId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updatingLoading, setUpdatingLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearchText(search);
  };
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", searchText],
    queryFn: async () => {
      const res = await fetch(
        `https://anaf-server.vercel.app/orders?search=${searchText}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("accessToken");
        return logOut();
      }
      const data = await res.json();
      return data?.reverse();
    },
  });
  console.log(orders);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  // Get the current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orders.slice(startIndex, endIndex);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log(orders);
  const handleUpdate = (e) => {
    e.preventDefault();
    const status = e.target.orderStatus.value;
    const orderStatus = {
      status,
    };
    setUpdatingLoading(true);
    fetch(`https://anaf-server.vercel.app/order-payment-status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(orderStatus),
    })
      .then((res) => {
        setUpdatingLoading(false);
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setUpdatingLoading(false);
        if (data.acknowledged) {
          refetch();
          toast("Order update", {
            icon: "🚀",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
  };
  const handleOrderStatusUpdate = (e) => {
    e.preventDefault();
    const orderStatus = e.target.orderStatus.value;
    const orderStatusInfo = {
      orderStatus,
    };
    setUpdatingLoading(true);
    fetch(`https://anaf-server.vercel.app/order-status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(orderStatusInfo),
    })
      .then((res) => {
        setUpdatingLoading(false);
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setUpdatingLoading(false);
        if (data.acknowledged) {
          refetch();
          toast("Order update", {
            icon: "🚀",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
  };

  const handleDeleteOrder = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      setDeleteLoading(true);
      fetch(`https://anaf-server.vercel.app/deleteOrder/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            toast.success("Deleted successfully");
            setDeleteLoading(false);
          }
          setDeleteLoading(false);
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
          setDeleteLoading(false);
        });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <section>
        <div className="my-2 ">
          <form onSubmit={handleSearch} className="flex items-center flex-row">
            <input
              type="text"
              className="bg-neutral-200 outline-none p-3 w-full placeholder:text-neutral-600"
              placeholder="Search order id #035350"
              name="search"
              id=""
            />
            <button
              type="submit"
              className=" bg-neutral-900 text-white p-3 px-4 "
            >
              {" "}
              Search{" "}
            </button>
          </form>
        </div>
        <div>
          {orders?.length > 0 && (
            <div className="flex flex-col border">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-white font-medium uppercase">
                        <tr>
                          <th scope="col" className="px-3 py-4">
                            #Id
                          </th>
                          <th scope="col" className="px-3 py-4">
                            name
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Date
                          </th>
                          <th scope="col" className="px-6">
                            Product
                          </th>
                          <th scope="col" className="px-3 py-4">
                            status
                          </th>

                          <th scope="col" className="px-3 py-4">
                            Order status
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Total
                          </th>

                          <th scope="col" className="px-3 py-4">
                            Payment Update
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Status Update
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Delete
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Action
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Refund
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCurrentPageData()?.map((order, i) => (
                          <tr
                            key={order._id}
                            className="border-b odd:bg-gray-100 font-medium"
                          >
                            <td
                              className="whitespace-nowrap px-3 py-4 font-medium"
                              title={order.orderId}
                            >
                              #{order.orderId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 font-medium">
                              <h2>{order.userData?.name}</h2>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4">
                              {order.dateTime}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4">
                              {order?.productsList[0].name.length > 15 ? (
                                <h5>
                                  {order?.productsList[0]?.name.substr(0, 15) +
                                    "..."}
                                </h5>
                              ) : (
                                <h5>{order?.productsList[0]?.name}</h5>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 ">
                              <span
                                className={`${
                                  order.status === "PAID" ||
                                  order.status === "UNPAID" ||
                                  order.status === "PAID-COD"
                                    ? "bg-green-700"
                                    : "bg-red-600"
                                } px-2 py-1 rounded-full text-center text-white`}
                              >
                                {order.status
                                  ? order.status.includes("Refunded")
                                    ? "REFUNDED"
                                    : order.status
                                  : "Pending"}
                              </span>
                            </td>
                            {/* order status */}
                            <td className="whitespace-nowrap uppercase text-left px-3 py-4 ">
                              {order?.orderStatus === "completed" && (
                                <span className="bg-green-600 text-white rounded-full py-1 px-2">
                                  {order?.orderStatus}
                                </span>
                              )}

                              {order?.orderStatus === "processing" && (
                                <span className="bg-purple-60 text-white bg-purple-600 py-1 px-2 rounded-full">
                                  {order?.orderStatus}
                                </span>
                              )}

                              {order?.orderStatus === "pending" && (
                                <span className="bg-yellow-500 text-white py-1 px-2 rounded-full">
                                  {order?.orderStatus}
                                </span>
                              )}

                              {order?.orderStatus === "cancel" && (
                                <span className="bg-red-600 text-white py-1 px-2 rounded-full">
                                  {order?.orderStatus}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4">
                              {order.total}Tk
                            </td>
                            <td className="whitespace-nowrap px-2 py-4">
                              <form
                                className="flex items-center"
                                onSubmit={handleUpdate}
                              >
                                <select
                                  disabled={order?.status?.includes("Refunded")}
                                  name="orderStatus"
                                  className="p-2 outline-none bg-neutral-300 rounded-sm disabled:bg-neutral-200"
                                >
                                  <option value="PAID-COD">PAID-COD</option>
                                  <option value="PAID">PAID</option>
                                  <option value="UNPAID">UNPAID</option>
                                  <option value="CANCEL">CANCEL</option>
                                </select>

                                <button
                                  type="submit"
                                  disabled={order?.status?.includes("Refunded")}
                                  onClick={() => setOrderId(order._id)}
                                  className="bg-neutral-200 rounded-full p-2 flex items-center ml-2"
                                >
                                  <TbSettingsFilled
                                    className={`text-neutral-900 ${
                                      updatingLoading && "animate-spin"
                                    }`}
                                    size={23}
                                  />
                                </button>
                              </form>
                            </td>
                            <td className="whitespace-nowrap px-2 py-4">
                              <form
                                className="flex items-center"
                                onSubmit={handleOrderStatusUpdate}
                              >
                                <select
                                  disabled={order?.status?.includes("Refunded")}
                                  name="orderStatus"
                                  className="p-2 outline-none bg-neutral-300 rounded-sm disabled:bg-neutral-200"
                                >
                                  <option value="completed">COM</option>
                                  <option value="processing">PROS</option>
                                  <option value="pending">PEN</option>
                                  <option value="cancel">CAN</option>
                                </select>

                                <button
                                  type="submit"
                                  disabled={order?.status?.includes("Refunded")}
                                  onClick={() => setOrderId(order._id)}
                                  className="bg-neutral-200 rounded-full p-2 flex items-center ml-2"
                                >
                                  <TbSettingsFilled
                                    className={`text-neutral-900 ${
                                      updatingLoading && "animate-spin"
                                    }`}
                                    size={23}
                                  />
                                </button>
                              </form>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4">
                              <button
                                onClick={() => handleDeleteOrder(order._id)}
                                className="bg-red-600 cursor-pointer flex items-center justify-center rounded-full p-2"
                              >
                                {deleteLoading ? (
                                  <HiOutlineCog8Tooth
                                    size={20}
                                    className="bg-red-600 animate-spin text-white"
                                  />
                                ) : (
                                  <TbTrashFilled
                                    size={20}
                                    className="text-white"
                                  />
                                )}
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 font-medium">
                              <Link to={`/order/${order._id}`}>
                                <button className="bg-blue-600 px-4 py-2 text-white rounded">
                                  {" "}
                                  View
                                </button>
                              </Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4">
                              <Link to={`/dashboard/refund/${order._id}`}>
                                <button
                                  disabled={order.status !== "PAID"}
                                  className="bg-purple-600 disabled:bg-neutral-300 py-2 px-4 rounded text-white"
                                >
                                  Refund
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Pagination controls */}
        <div className="text-right mt-2 flex justify-end space-x-3 mb-3">
          <button
            className="bg-black disabled:bg-neutral-500 text-white p-1 rounded px-3"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            className="bg-black disabled:bg-neutral-500 text-white p-1 rounded px-3"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </AnimatePage>
  );
};

export default AllOrders;

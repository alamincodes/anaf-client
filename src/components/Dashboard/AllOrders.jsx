import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { GrUpdate } from "react-icons/gr";
import AnimatePage from "../Shared/AnimatePage";
import useTitle from "../../hooks/useTitle";
import { toast } from "react-hot-toast";
import { HiOutlineTrash, HiOutlineCog8Tooth } from "react-icons/hi2";

import { useQuery } from "@tanstack/react-query";

const AllOrders = () => {
  useTitle("Admin order");
  const { logOut } = useContext(AUTH_CONTEXT);
  const [orderId, setOrderId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
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
        // console.log(data);
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
      <div>
        <div className="my-2 ">
          <form onSubmit={handleSearch} className="flex items-center flex-row">
            <input
              type="text"
              className="bg-neutral-200 outline-none p-2 w-full"
              placeholder="Search order id #035350"
              name="search"
              id=""
            />
            <button
              type="submit"
              className=" bg-neutral-700 text-white p-2 px-4 "
            >
              {" "}
              Search{" "}
            </button>
          </form>
        </div>
        <div>
          {orders?.length > 0 && (
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
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
                          <th scope="col" className="px-3 py-4">
                            Action
                          </th>

                          <th scope="col" className="px-3 py-4">
                            status
                          </th>
                          <th scope="col" className="px-6">
                            Product
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Total
                          </th>

                          <th scope="col" className="px-3 py-4">
                            Update
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Delete
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
                            <td className="whitespace-nowrap px-3 py-4 font-medium">
                              <Link to={`/order/${order._id}`}>
                                <span className="text-blue-600"> View</span>
                              </Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 ">
                              <span className="bg-green-700 p-2 rounded-sm text-white">
                                {order.status ? order.status : "Pending"}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4">
                              {order.productsList?.map((p) => (
                                <span key={p._id}>
                                  {p.name.length > 7
                                    ? p.name.substr(0, 7) + "..."
                                    : p.name}
                                </span>
                              ))}
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
                                  name="orderStatus"
                                  className="p-2 outline-none"
                                >
                                  <option value="receive">receive</option>
                                  <option value="processing">processing</option>
                                  <option value="Handover to Courier">
                                    Handover to Courier
                                  </option>
                                  <option value="pending">pending</option>
                                  <option value="cancel">cancel</option>
                                </select>

                                <button
                                  type="submit"
                                  onClick={() => setOrderId(order._id)}
                                  className="bg-neutral-200 rounded-full p-2 flex items-center ml-2"
                                >
                                  <GrUpdate className="text-whit " size={20} />
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
                                  <HiOutlineTrash
                                    size={20}
                                    className="text-white"
                                  />
                                )}
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4">
                              <Link to={`/dashboard/refund/${order._id}`}>
                                <button className="bg-purple-600 py-2 px-4 rounded text-white">
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
      </div>
    </AnimatePage>
  );
};

export default AllOrders;

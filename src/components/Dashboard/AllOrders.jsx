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
              className="bg-gray-200 outline-none p-2 w-full"
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
                          <th scope="col" className="px-6 py-4">
                            name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Action
                          </th>
                          <th scope="col" className="px-6 py-4">
                            #Id
                          </th>
                          <th scope="col" className="px-6 py-4">
                            status
                          </th>
                          <th scope="col" className="px-6">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Total
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Update
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.map((order, i) => (
                          <tr
                            key={order._id}
                            className="border-b odd:bg-gray-100 font-medium"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <h2>{order.userData?.name}</h2>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <Link to={`/order/${order._id}`}>
                                <span className="text-blue-600"> View</span>
                              </Link>
                            </td>

                            <td
                              className="whitespace-nowrap px-6 py-4 font-medium"
                              title={order._id}
                            >
                              #{order.orderId}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 ">
                              <span className="bg-yellow-200 p-2 rounded-sm text-yellow-800">
                                {order.status ? order.status : "Pending"}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.productsList?.map((p) => (
                                <span key={p._id}>
                                  {p.name.length > 7
                                    ? p.name.substr(0, 7) + "..."
                                    : p.name}
                                </span>
                              ))}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.total}Tk
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.dateTime}
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
                                  <option value="Handover to Courier">
                                    Handover to Courier
                                  </option>
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
                            <td className="whitespace-nowrap px-6 py-4">
                              <h2
                                onClick={() => handleDeleteOrder(order._id)}
                                className="bg-red-100 cursor-pointer flex items-center justify-center rounded-full p-3"
                              >
                                {deleteLoading ? (
                                  <HiOutlineCog8Tooth
                                    size={20}
                                    className="text-red-600 animate-spin"
                                  />
                                ) : (
                                  <HiOutlineTrash
                                    size={20}
                                    className="text-red-600"
                                  />
                                )}
                              </h2>
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
      </div>
    </AnimatePage>
  );
};

export default AllOrders;

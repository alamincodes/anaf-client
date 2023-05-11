import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

const AllOrders = () => {
  const { logOut } = useContext(AUTH_CONTEXT);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setOrders(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
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
                          <span className="bg-yellow-200 p-2 rounded-sm text-yellow-800">
                            {order.orderStatus ? order.orderStatus : "Pending"}
                          </span>
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
  );
};

export default AllOrders;

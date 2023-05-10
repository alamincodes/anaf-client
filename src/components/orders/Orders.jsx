import React, { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import AnimatePage from "../Shared/AnimatePage";
import LoadingSpinner from "../Shared/LoadingSpinner";
const Orders = () => {
  const { user } = useContext(AUTH_CONTEXT);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/order?email=${user?.email}`)
      .then((res) => res.json())
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
                      <tr key={order._id} className="border-b odd:bg-gray-100 font-medium">
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
                          {order.items[0].name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order.discountTotal}Tk
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          <span className="bg-green-200 p-2 rounded-sm text-green-800">
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
    </AnimatePage>
  );
};

export default Orders;

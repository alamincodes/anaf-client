import React, { useEffect, useState } from "react";

const UserOrderCounter = ({ user }) => {
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
        setOrders(ordersData?.reverse());
        setIsLoading(false);
      });
  }, []);
  return (
    <section>
      <div>UserOrderCounter</div>
    </section>
  );
};

export default UserOrderCounter;

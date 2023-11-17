import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const UserOrderCounter = ({ user }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const statusCounts = { pending: 0, cancel: 0, completed: 0, processing: 0 };

  ordersData.forEach((order) => {
    statusCounts[order.orderStatus] += 1;
  });

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const COLORS = ["#FCA13A", "#F34141", "#26A44F", "#683DD9"];

  const tooltipContentStyle = {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    border: "1px solid white",
    borderRadius: "5px",
    padding: "10px",
  };

  const tooltipItemStyle = { color: "white" };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/orders-rate?email=${user?.email}`, {
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
        setOrdersData(ordersData);
        setIsLoading(false);
      });
  }, []);
  return (
    <section className=" text-white" style={{ width: "100%", height: "265px" }}>
      <ResponsiveContainer>
        <PieChart width="100%" height="100%">
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            itemStyle={tooltipItemStyle}
            contentStyle={tooltipContentStyle}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default UserOrderCounter;

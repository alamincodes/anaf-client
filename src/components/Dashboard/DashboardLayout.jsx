import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="myContainer">
      <ul className="flex border-b items-center border-gray-200 font-gray-500 text-sm font-medium text-gray-500 overflow-x-auto scrollbar-hide">
        <NavLink
          className={({ isActive }) => (isActive ? "text-black" : undefined)}
          to="/dashboard/allOrders"
        >
          <li className="-mb-px  p-4 flex items-center" title="change password">
            <BsBoxSeam size={18} className="mr-1" /> All{" "}
            <span className="ml-1">Orders</span>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? " border-black text-black" : undefined
          }
          to="/dashboard/allUsers"
        >
          <li className="-mb-px border-b-2 border-black border-transparent p-4 flex items-center">
            <FaUsers size={18} className="mr-1" /> All{" "}
            <span className="ml-1">Users</span>
          </li>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? " text-black" : undefined)}
          to="/dashboard/addProducts"
        >
          <li className="-mb-px p-4 flex items-center">
            <MdOutlineAddBox size={20} className="mr-1" /> Add{" "}
            <span className="ml-1">Product</span>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? " text-black" : undefined)}
          to="/dashboard/findOrder"
        >
          <li className="-mb-px p-4 flex items-center">
            <MdOutlineAddBox size={20} className="mr-1" /> Find{" "}
            <span className="ml-1">Order</span>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? " text-black" : undefined)}
          to="/dashboard/allProduct"
        >
          <li className="-mb-px p-4 flex items-center">
            <BsBoxSeam size={20} className="mr-1" /> All
            <span className="ml-1">Product</span>
          </li>
        </NavLink>
      </ul>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;

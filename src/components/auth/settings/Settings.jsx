import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdAccountBox, MdKey } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { FaRegAddressCard } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
const Settings = () => {
 
  useTitle("Settings");
  
  return (
    <div className="myContainer">
     
      <h2 className="font-bold text-2xl mt-2">Settings</h2>
      <ul className="flex border-b items-center border-gray-200 font-gray-500 text-sm font-medium text-gray-500 overflow-x-auto scrollbar-hide">
        <NavLink
          className={({ isActive }) =>
            isActive ? " border-black text-black" : undefined
          }
          to="/settings/general"
        >
          <li className="-mb-px border-b-2 border-black border-transparent p-4 flex items-center">
            <MdAccountBox size={18} className="mr-1" /> General
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-black" : undefined)}
          to="/settings/changePassword"
        >
          <li className="-mb-px  p-4 flex items-center" title="change password">
            <MdKey size={18} className="mr-1" /> Change{" "}
            <span className="ml-1">password</span>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? " text-black" : undefined)}
          to="/settings/dangerZone"
        >
          <li className="-mb-px p-4 flex items-center">
            <TiWarning size={18} className="mr-1" /> Danger{" "}
            <span className="ml-1">zone</span>
          </li>
        </NavLink>
      </ul>
      <Outlet />
    </div>
  );
};

export default Settings;

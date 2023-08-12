import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdAccountBox, MdKey } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { FaRegAddressCard } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner";
const Settings = () => {
  const { user } = useContext(AUTH_CONTEXT);
  useTitle("Settings");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
        setIsLoading(false);
      });
  }, [user]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto ">
      <div>
        <h2 className="font-bold text-2xl mt-10">Account</h2>
        <div className="bg-white backdrop-filter backdrop-blur-3xl bg-opacity-10 overflow-hidden border text-center relative">
          {/* <div className="absolute -inset-0.5 left-0 bg-gradient-to-l from-fuchsia-500 to-orange-500 blur-3xl opacity-10"></div> */}
          <div className="p-2 flex justify-center items-center ">
            <span className="bg-gray-200 p-2 text-gray-900 rounded-full">
              <FaRegAddressCard size={30} />
            </span>
          </div>
          <h2 className="font-bold bg-white py-4 border-t ">
            {user?.displayName}
          </h2>
          <h2 className="font-bold py-4 border-t border-l-0 border-r-0">
            {userData.phone}
          </h2>
          <h2 className="font-bold bg-white py-4 border-t border-l-0 border-r-0">
            {user?.email.length > 25 ? user?.email.substr(0, 20) + "..." : user?.email}
          </h2>
          <h2 className="font-bold py-4 border-t border-l-0 border-r-0">
            {userData.address}
          </h2>
        </div>
      </div>
      <h2 className="font-bold text-2xl mt-10">Settings</h2>
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

import React, { useContext, useEffect } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { RiSettings5Line } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { VscSignOut } from "react-icons/vsc";
import useAdmin from "../../hooks/useAdmin";

const ProfileMenu = () => {
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const { emptyCart } = useCart();
  const [isAdmin] = useAdmin(user?.email);
  console.log(isAdmin);
  const handleLogOut = () => {
    emptyCart();
    localStorage.removeItem("accessToken");
    logOut();
  };
  return (
    <div
      className="absolute md:right-3 right-1 md:top-6 top-7 border bg-white w-[200px] text-base z-50 list-none divide-y divide-gray-100 rounded shadow-boxShadow my-4"
      id="dropdown"
    >
      <div className="px-4 py-3">
        <span className="font-bold text-md">{user?.displayName}</span>
        <span className="block text-sm font-medium text-gray-900 truncate">
          {user?.email}
        </span>
      </div>
      <ul className="py-1" aria-labelledby="dropdown">
        <Link
          to="/orders"
          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
        >
          <li className="flex items-center">
            {" "}
            <BsBoxSeam className="mr-1" /> <span>Orders</span>
          </li>
        </Link>
        <Link
          to="/settings/general"
          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
        >
          <li className="flex items-center">
            <RiSettings5Line size={18} className="mr-1" /> <span>Settings</span>
          </li>
        </Link>
        {isAdmin && (
          <Link
            to="/dashboard/allUsers"
            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
          >
            <li className="flex items-center">
              <RxDashboard size={16} className="mr-1" /> <span>Dashboard</span>
            </li>
          </Link>
        )}

        <li
          onClick={handleLogOut}
          className="flex items-center  text-sm font-bold hover:bg-gray-100 text-red-700 border-t px-4 py-2"
        >
          <VscSignOut size={18} className="mr-1" /> Sign out
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;

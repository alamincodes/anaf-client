import React, { useContext, useEffect } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { Menu } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { BiUser, BiLogOutCircle } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { BsBox } from "react-icons/bs";
import avatar from "../../assets/image/avatar.svg";
const ProfileMenu = () => {
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const { emptyCart } = useCart();
  const [isAdmin] = useAdmin(user?.email);
  // console.log(isAdmin);
  const handleLogOut = () => {
    emptyCart();
    localStorage.removeItem("accessToken");
    logOut();
  };
  return (
    <div className="relative mt-2">
      <Menu >
        <Menu.Button>
          <div className="flex items-center space-x-1">
            <span>
              <img src={avatar} className="w-10 h-10 object-cover" alt="" />
            </span>
            <span className="font-medium flex items-center">
              {user?.displayName?.length > 12
                ? user?.displayName.substr(0, 12) + "..."
                : user?.displayName}
              <HiChevronDown size={26} />
            </span>
          </div>
        </Menu.Button>
        <Menu.Items className="flex flex-col bg-[#fff] text-black shadow-secondary absolute w-64 md:top-12 top-10 right-0 z-50 text-left rounded py-2">
          <Menu.Item className="transition-all px-3 font-secondary">
            <span className="flex items-center text-lg font-semibold text-orange-500">
              {user?.displayName?.length > 12
                ? user?.displayName.substr(0, 12) + "..."
                : user?.displayName}
            </span>
          </Menu.Item>
          <Menu.Item className="transition-all px-3 font-secondary border-b">
            <span className="font-medium flex items-center text-neutral-600">
              {user?.email?.length > 25
                ? user?.email.substr(0, 25) + "..."
                : user?.email}
            </span>
          </Menu.Item>
          <Menu.Item className="transition-all px-2 font-secondary">
            <Link to="/orders">
              <h2 className="inline-flex hover:bg-gray-100 px-1 rounded w-full items-center py-2">
                <span>{/* <BsBox className="mr-3" size={15} /> */}</span>
                My orders
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item className="text-sm transition-all px-2 font-secondary pt-1 ">
            <Link to="/settings/general">
              <h2 className="inline-flex hover:bg-gray-100 px-1 rounded w-full items-center py-2">
                <span>{/* <BiUser className="mr-3" size={15} /> */}</span>
                Profile
              </h2>
            </Link>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item className="text-sm transition-all px-2 font-secondary pt-1 ">
              <Link to="/dashboard/allOrders">
                <h2 className="inline-flex hover:bg-gray-100 px-1 rounded w-full items-center py-2">
                  <span>
                    {/* <RxDashboard className="mr-3" size={15} /> */}
                  </span>
                  Dashboard
                </h2>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item className="text-sm transition-all px-2 font-secondary pt-1">
            <div onClick={handleLogOut}>
              <h2 className="inline-flex hover:bg-gray-100 font-medium px-1 rounded w-full items-center py-2">
                <span>{/* <RxDashboard className="mr-3" size={15} /> */}</span>
                Logout
              </h2>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default ProfileMenu;

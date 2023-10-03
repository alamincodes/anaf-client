import React, { useContext, useEffect } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { Menu } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
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
      <Menu>
        <Menu.Button>
          <div className="flex items-center space-x-1">
            <span>
              <img src={avatar} className="w-10 h-10 object-cover" alt="" />
            </span>
            <span className="font-medium flex items-center">
              {user?.displayName?.length > 12
                ? user?.displayName.substr(0, 12) + "..."
                : user?.displayName}
              <span className="bg-neutral-200 rounded-full">
                <HiChevronDown size={26} />
              </span>
            </span>
          </div>
        </Menu.Button>
        <Menu.Items className="flex flex-col bg-[#fff] text-black shadow-secondary absolute w-64 md:top-12 top-10 right-0 z-50 text-left rounded py-2">
          <Menu.Item className="transition-all px-3">
            <Link to="/orders">
              <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                <span>{/* <BsBox className="mr-3" size={15} /> */}</span>
                My orders
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item className="text-sm transition-all px-3 pt-1 ">
            <Link to="/profile">
              <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                <span>{/* <BiUser className="mr-3" size={15} /> */}</span>
                Profile
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item className="text-sm transition-all px-3 pt-1 ">
            <Link to="/settings/general">
              <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                <span>{/* <BiUser className="mr-3" size={15} /> */}</span>
                Settings
              </h2>
            </Link>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item className="text-sm transition-all px-3 pt-1 ">
              <Link to="/dashboard/allOrders">
                <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                  <span>
                    {/* <RxDashboard className="mr-3" size={15} /> */}
                  </span>
                  Dashboard
                </h2>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item className="text-sm transition-all px-3 pt-1">
            <div onClick={handleLogOut}>
              <h2 className="inline-flex hover:bg-neutral-100 font-medium px-3 rounded w-full items-center py-2">
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

import React, { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { Menu } from "@headlessui/react";
import avatar from "../../assets/image/avatar.svg";
import {
  dashboardIcon,
  logoutIcon,
  orderIcon,
  settingIcon,
  userIcon,
} from "./icons/svgIcons";
import LogoutModal from "../modal/LogoutModal";

const ProfileMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const { emptyCart } = useCart();
  const [isAdmin] = useAdmin(user?.email);

  return (
    <div className="relative mt-2">
      <Menu>
        <Menu.Button>
          <div className="flex items-center space-x-1">
            <span>
              <img src={avatar} className="w-10 h-10 object-cover" alt="" />
            </span>
          </div>
        </Menu.Button>
        <Menu.Items className="flex flex-col bg-[#fff] text-black shadow-secondary absolute w-64 md:top-12 top-10 right-0 z-50 text-left rounded py-2">
          <Menu.Item className="transition-all px-3">
            <Link to="/orders">
              <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                <span className="mr-2">{orderIcon()}</span>
                My orders
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item className="text-sm transition-all px-3 pt-1 ">
            <Link to="/profile">
              <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                <span className="mr-2">{userIcon()}</span>
                Profile
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item className="text-sm transition-all px-3 pt-1 ">
            <Link to="/settings/general">
              <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                <span className="mr-2">{settingIcon()}</span>
                Settings
              </h2>
            </Link>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item className="text-sm transition-all px-3 pt-1 ">
              <Link to="/dashboard/allOrders">
                <h2 className="inline-flex hover:bg-neutral-100 px-3 rounded w-full items-center py-2">
                  <span className="mr-2">{dashboardIcon()}</span>
                  Dashboard
                </h2>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item className="text-sm transition-all px-3 pt-1 ">
            <div onClick={() => setOpenModal(true)}>
              <h2 className="inline-flex font-medium px-3 rounded w-full items-center py-2 border border-red-300 bg-red-100 hover:bg-red-200">
                <span className="mr-2">{logoutIcon()}</span>
                Logout
              </h2>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Menu>

      {openModal && (
        <LogoutModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default ProfileMenu;

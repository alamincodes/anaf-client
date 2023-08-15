import React, { useContext, useEffect } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { Menu } from "@headlessui/react";
import { HiUser } from "react-icons/hi2";
import { BiUser, BiLogOutCircle,  } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { BsBox } from "react-icons/bs";
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
          <div className="flex items-center">
            <span className="p-1">
              <HiUser size={27} />
            </span>
          </div>
        </Menu.Button>
        <Menu.Items className="flex flex-col shadow font-medium overflow-hidden absolute w-48 md:top-12 top-10 right-0 z-50 border text-left bg-white rounded-lg">
          <Menu.Item className="hover:bg-neutral-800 hover:text-white transition-all px-2 font-secondary pt-1 border-b">
            <Link to="/orders">
              <h2 className="inline-flex items-center uppercase text-sm font-semibold py-2">
                <span>
                  <BsBox className="mr-3" size={20} />
                </span>
                Orders
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item className="hover:bg-neutral-800 uppercase text-sm hover:text-white transition-all px-2 font-secondary pt-1 border-b">
            <Link to="/settings/general">
              <h2 className="inline-flex items-center font-semibold py-2">
                <span>
                  <BiUser className="mr-3" size={20} />
                </span>
                Account
              </h2>
            </Link>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item className="hover:bg-neutral-800 uppercase text-sm hover:text-white transition-all px-2 font-secondary pt-1 border-b">
              <Link to="/dashboard/allOrders">
                <h2 className="inline-flex items-center font-semibold py-2">
                  <span>
                    <RxDashboard className="mr-3" size={20} />
                  </span>
                  Dashboard
                </h2>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item className="uppercase text-sm text-red-500 hover:bg-red-500 hover:text-white px-2 py-2">
            <h2
              onClick={handleLogOut}
              className="inline-flex items-center font-semibold"
            >
              <span>
                <BiLogOutCircle size={20} className="mr-3" />
              </span>
              Log Out
            </h2>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default ProfileMenu;

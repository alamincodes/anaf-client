import React, { useContext, useState } from "react";
import { TOOLS_PROVIDER } from "../../context/ToolsProvider";
import avatar from "../../assets/image/avatar.svg";
import { IoClose } from "react-icons/io5";
import { HiChevronRight, HiLogout } from "react-icons/hi";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";



import LogoutModal from "../modal/LogoutModal";

const MobileNav = () => {
  const [openModal, setOpenModal] = useState(false);
  const { openMenu, setOpenMenu } = useContext(TOOLS_PROVIDER);
  const { user } = useContext(AUTH_CONTEXT);
  const [isAdmin] = useAdmin(user?.email);

  const handleClickLogout = () => {
    setOpenModal(true);
    setOpenMenu(false);
  };

  return (
    <>
      <div
        className={`${
          openMenu ? "left-0" : "-left-full"
        }  fixed top-0 bottom-0 lg:hidden bg-neutral-900 transition-all text-white z-50 w-64 duration-300`}
      >
        <IoClose
          onClick={() => setOpenMenu(false)}
          className="text-3xl z-10 absolute right-4 top-4 cursor-pointer"
        />

        <ul className="flex justify-center uppercase flex-col h-full space-y-5 px-3">
          {user?.email && (
            <li
              // onClick={() => setOpen(false)}
              className="bg-neutral-800 border-b text-white px-2 py-5 absolute top-0 left-0 right-0 "
            >
              <div className="flex flex-col">
                <div className="flex justify-center items-center mb-1 bg-neutral-500 h-12 w-12 rounded-full">
                  <img src={avatar} alt="" />
                </div>
                <div>
                  <h2 className="font-bold"> {user?.displayName} </h2>
                  <h2 className="lowercase">
                    {" "}
                    {user?.email.length > 24
                      ? user?.email.substr(0, 24) + "..."
                      : user?.email}{" "}
                  </h2>
                </div>
              </div>
            </li>
          )}
          <Link onClick={() => setOpen(false)} to="/">
            <li className="flex justify-between items-center mt-5">
              <span>Home</span>
              <span>
                {" "}
                <HiChevronRight size={20} />
              </span>
            </li>
          </Link>
          <Link onClick={() => setOpen(false)} to="/products">
            <li className="flex justify-between items-center">
              <span>Shop</span>
              <span>
                {" "}
                <HiChevronRight size={20} />
              </span>
            </li>
          </Link>
          {user?.email && (
            <Link onClick={() => setOpen(false)} to="/orders">
              <li className="flex justify-between items-center">
                <span>Orders</span>
                <span>
                  {" "}
                  <HiChevronRight size={20} />
                </span>
              </li>
            </Link>
          )}
          {user?.email && (
            <Link onClick={() => setOpen(false)} to="/settings/general">
              <li className="flex justify-between items-center">
                <span>settings</span>
                <span>
                  {" "}
                  <HiChevronRight size={20} />
                </span>
              </li>
            </Link>
          )}
          {isAdmin && (
            <Link onClick={() => setOpen(false)} to="/dashboard/allOrders">
              <li className="flex justify-between items-center">
                <span>Dashboard</span>
                <span>
                  {" "}
                  <HiChevronRight size={20} />
                </span>
              </li>
            </Link>
          )}
          {user?.email && (
            <li
              onClick={handleClickLogout}
              className="flex justify-between bg-red-600 p-2 rounded font-bold items-center"
            >
              <span>Logout</span>
              <span>
                {" "}
                <HiLogout size={20} />
              </span>
            </li>
          )}
          {/* login sign up */}
          {!user?.email && (
            <div className="flex justify-start items-start space-x-5">
              <Link onClick={() => setOpen(false)} to="/login">
                <li className="border-2 border-white px-4 py-2 rounded">
                  Login
                </li>
              </Link>
              <Link onClick={() => setOpen(false)} to="/signUp">
                <li className="bg-white rounded border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white transition-all duration-300 text-black font-bold p-2 px-4">
                  Sign up
                </li>
              </Link>
            </div>
          )}
          {/* -- login sign up end-- */}
        </ul>
      </div>
      {/* Logout modal open */}
      {openModal && (
        <LogoutModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default MobileNav;

import React, { useContext, useState, Fragment } from "react";
import { TOOLS_PROVIDER } from "../../context/ToolsProvider";
import avatar from "../../assets/image/avatar.svg";
import { IoClose } from "react-icons/io5";
import { HiChevronRight, HiLogout } from "react-icons/hi";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useCart } from "react-use-cart";
// logout modal
import { Dialog, Transition } from "@headlessui/react";

const MobileNav = () => {
  const [openModal, setOpenModal] = useState(false);

  const { openMenu, setOpenMenu } = useContext(TOOLS_PROVIDER);
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const { emptyCart } = useCart();
  const [isAdmin] = useAdmin(user?.email);

  const handleClickLogout = () => {
    setOpenModal(true);
    setOpenMenu(false);
  };
  const handleLogOut = () => {
    emptyCart();
    localStorage.removeItem("accessToken");
    logOut();
    setOpenModal(false);
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
        <Transition appear show={openModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setOpenModal(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Are you sure you want to log out of your account?
                    </Dialog.Title>

                    <div className="mt-4 flex items-center justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900  "
                        onClick={handleLogOut}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-300 "
                        onClick={() => setOpenModal(false)}
                      >
                        No
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default MobileNav;

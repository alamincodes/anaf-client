import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/anaf.svg";
import { HiOutlineMenu, HiOutlineShoppingBag } from "react-icons/hi";
import { TbSearch } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import ProfileMenu from "./ProfileMenu";
import { Link, NavLink } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import useAdmin from "../../hooks/useAdmin";
import BottomNav from "./BottomNav";
const Navbar = () => {
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const { emptyCart } = useCart();
  const { totalUniqueItems } = useCart();
  const [open, setOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  // console.log(userFullInfo);
  const [isAdmin] = useAdmin(user?.email);

  const handleLogOut = () => {
    emptyCart();
    localStorage.removeItem("accessToken");
    logOut();
  };
  return (
    <>
      <div className="bg-white sticky top-0 z-20">
        <nav className="md:container md:mx-auto px-2 md:py-3 py-4 relative">
          <div className="flex justify-between items-center">
            {/* menu */}
            <span className="md:hidden">
              <HiOutlineMenu
                onClick={() => setOpen(true)}
                className=""
                size={30}
              />
            </span>
            {/* logo */}
            <div>
              <Link to="/">
                <img src={logo} className="md:w-28 w-20 h-12" alt="" />
              </Link>
            </div>
            {/* home */}
            <ul className="md:flex hidden items-center space-x-5 font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-gray-100 rounded" : undefined
                }
              >
                <li className="cursor-pointer py-1 px-2">Home</li>
              </NavLink>
              {/* product */}
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "bg-gray-100 rounded" : undefined
                }
              >
                <li className="cursor-pointer py-1 px-2">Shop</li>
              </NavLink>
              {/* cart */}
              <Link to="/search">
                <li className="cursor-pointer relative">
                  <TbSearch size={30} />
                </li>
              </Link>
              <Link to="/cart">
                <li className="cursor-pointer relative">
                  {totalUniqueItems > 0 && (
                    <span className=" absolute bg-black p-1 px-2 top-4 text-white rounded-full text-xs">
                      {totalUniqueItems}
                    </span>
                  )}
                  <HiOutlineShoppingBag size={30} className="mb-1" />
                </li>
              </Link>
              {!user?.email && (
                <>
                  <Link to="/login">
                    {" "}
                    <li className="cursor-pointer">Login</li>
                  </Link>
                  <Link to="/signUp">
                    <li className="cursor-pointer rounded-md bg-black text-white p-2 px-4">
                      Sign up
                    </li>
                  </Link>
                </>
              )}

              {/* ---profile menu start---- */}
              {user?.email && (
                <button
                  className="cursor-pointer  relative "
                  onClick={() => setOpenProfileMenu(!openProfileMenu)}
                >
                  {user?.email && (
                    <div>
                      <FaUser size={28} />
                    </div>
                  )}
                  {openProfileMenu && <ProfileMenu />}
                </button>
              )}
              {/* ---profile menu end---- */}
            </ul>

            {/* menu  icon */}
            <div className="md:hidden flex items-center space-x-2">
              {!user?.email && (
                <Link to="/login">
                  <h2 className="bg-black uppercase text-white text-xs py-[6px] px-3 rounded">
                    Login
                  </h2>
                </Link>
              )}
              {/* cart */}
              <Link to="/search">
                <h2 className="cursor-pointer relative">
                  <TbSearch size={30}  />
                </h2>
              </Link>
              <Link to="/cart">
                <h2 className="cursor-pointer relative mb-1">
                  {totalUniqueItems > 0 && (
                    <span className="absolute bg-black p-1 px-2 top-4 text-white rounded-full text-xs">
                      {totalUniqueItems}
                    </span>
                  )}
                  <HiOutlineShoppingBag size={32} />
                </h2>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* mobile nav */}

      <BottomNav />
      <div
        className={`${
          open ? "left-0" : "-left-full"
        } fixed top-0 bottom-0 lg:hidden bg-neutral-900 transition-all text-white z-20 w-64 duration-300`}
      >
        <IoClose
          onClick={() => setOpen(false)}
          className="text-3xl absolute right-4 top-4 cursor-pointer"
        />

        <ul className="flex justify-center uppercase flex-col h-full space-y-5 px-3">
          {user?.email && (
            <li
              onClick={() => setOpen(false)}
              className="bg-white text-black px-2 py-5 absolute top-16 left-0 right-0"
            >
              <h2 className="font-bold"> {user?.displayName} </h2>
              <h2 className="lowercase">
                {" "}
                {user?.email.length > 25
                  ? user?.email.substr(0, 15) + "..."
                  : user?.email}{" "}
              </h2>
            </li>
          )}
          <Link onClick={() => setOpen(false)} to="/">
            <li className="flex justify-between items-center">
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
              onClick={handleLogOut}
              className="flex justify-between text-red-600 font-bold items-center"
            >
              <span>Logout</span>
              <span>
                {" "}
                <HiChevronRight size={20} />
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
                <li className="bg-white rounded-md border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white transition-all duration-300 text-black font-bold p-2 px-4">
                  Sign up
                </li>
              </Link>
            </div>
          )}
          {/* -- login sign up end-- */}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

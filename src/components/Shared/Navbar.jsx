import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/anaf.svg";
import { HiOutlineMenu, HiOutlineShoppingBag } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import { Link, NavLink } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";

const Navbar = () => {
  const { user, userFullInfo, loading } = useContext(AUTH_CONTEXT);
  const { totalUniqueItems } = useCart();
  const [open, setOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  // console.log(userFullInfo);

  return (
    <>
      <div className="bg-white sticky top-0 z-20">
        <nav className="md:container md:mx-auto px-2 md:py-3 py-4 relative">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/">
                <img src={logo} className="md:w-28 w-20 h-12" alt="" />
              </Link>
            </div>
            {/* home */}
            <ul className="md:flex hidden items-center space-x-8 font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-gray-200" : undefined
                }
              >
                <li className="cursor-pointer py-1 px-2">Home</li>
              </NavLink>
              {/* product */}
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "bg-gray-200" : undefined
                }
              >
                <li className="cursor-pointer py-1 px-2">Shop</li>
              </NavLink>
              {/* cart */}
              <Link to="/cart">
                <li className="cursor-pointer relative">
                  {totalUniqueItems > 0 && (
                    <span className=" absolute bg-black p-1 px-2 top-4 text-white rounded-full text-xs">
                      {totalUniqueItems}
                    </span>
                  )}
                  <HiOutlineShoppingBag size={30} />
                </li>
              </Link>
              {!user?.email && (
                <>
                  <Link to="/login">
                    {" "}
                    <li className="cursor-pointer">Login</li>
                  </Link>
                  <Link to="/signUp">
                    <li className="cursor-pointer bg-black text-white p-2 px-4">
                      Sign up
                    </li>
                  </Link>
                </>
              )}

              {/* ---profile menu start---- */}
              {user?.email && (
                <li
                  className="cursor-pointer relative"
                  onClick={() => setOpenProfileMenu(!openProfileMenu)}
                >
                  {user?.email && (
                    <FaUser className="text-3xl border-4 p-[2px] border-black rounded-full" />
                  )}
                  {openProfileMenu && <ProfileMenu />}
                </li>
              )}
              {/* ---profile menu end---- */}
            </ul>

            {/* menu  icon */}
            <div className="md:hidden flex items-center space-x-2">
              {/* cart */}
              <Link to="/cart">
                <h2 className="cursor-pointer relative">
                  {totalUniqueItems > 0 && (
                    <span className=" absolute bg-black p-1 px-2 top-4 text-white rounded-full text-xs">
                      {totalUniqueItems}
                    </span>
                  )}
                  <HiOutlineShoppingBag size={30} />
                </h2>
              </Link>
              {/* ---mobile profile menu start---- */}
              {user?.email && (
                <h2
                  className="cursor-pointer relative"
                  onClick={() => setOpenProfileMenu(!openProfileMenu)}
                >
                  {user?.email && (
                    <FaUser className="text-3xl border-4 p-[2px] border-black rounded-full" />
                  )}
                  {openProfileMenu && <ProfileMenu />}
                </h2>
              )}
              {/* ---mobile profile menu end---- */}
              <HiOutlineMenu
                onClick={() => setOpen(true)}
                className=" mt-1"
                size={30}
              />
            </div>
          </div>
        </nav>
      </div>

      {/* mobile nav */}

      <div
        className={`${
          open ? "right-0 " : "-right-full "
        } fixed top-0 bottom-0 lg:hidden bg-black/95  transition-all text-white z-20 w-48 duration-300`}
      >
        <IoClose
          onClick={() => setOpen(false)}
          className="text-3xl absolute left-4 top-6 cursor-pointer"
        />
        <ul className="flex flex-col items-center justify-center h-full space-y-8 font-secondary">
          <Link onClick={() => setOpen(false)} to="/">
            <li>Home</li>
          </Link>
          <Link onClick={() => setOpen(false)} to="/products">
            Shop
          </Link>
          {!user?.email && (
            <>
              <Link onClick={() => setOpen(false)} to="/login">
                <li>Login</li>
              </Link>
              <Link onClick={() => setOpen(false)} to="/signUp">
                <li className="bg-white border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white transition-all duration-300 text-black font-bold p-2 px-4">
                  Sign up
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

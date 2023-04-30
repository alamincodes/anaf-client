import React, { useState } from "react";
import logo from "../../assets/logo/anaf.svg";
import { HiOutlineMenu, HiOutlineShoppingBag } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="bg-white sticky top-0 z-20 mb-5">
        <nav className="md:container md:mx-auto px-1 md:py-3 py-1 relative">
          <div className="flex justify-between items-center">
            <div>
              <img src={logo} className="md:w-28 w-20 h-12" alt="" />
            </div>
            <ul className="md:flex hidden items-center space-x-8 font-semibold">
              <li className="cursor-pointer">Shop</li>
              <li className="cursor-pointer">Product</li>
              <li className="cursor-pointer">Login</li>
              <li className="cursor-pointer">Sign up</li>
              <li className="cursor-pointer relative">
                <span className=" absolute bg-black p-1 px-2 top-4 text-white rounded-full text-xs">
                  1
                </span>
                <HiOutlineShoppingBag size={30} />
              </li>
              {/* ---profile menu start---- */}
              <li className="cursor-pointer relative">
                <FaUserCircle
                  size={35}
                  onClick={() => setOpenMenu(!openMenu)}
                  className="mt-1"
                />
                {openMenu && <ProfileMenu />}
              </li>
              {/* ---profile menu end---- */}
            </ul>

            {/* menu  icon */}
            <div className="md:hidden flex items-center space-x-3">
              <h2 className="cursor-pointer relative">
                <span className="absolute bg-black p-1 px-2 top-4 text-white rounded-full text-xs">
                  1
                </span>
                <HiOutlineShoppingBag size={30} />
              </h2>
              {/* ---mobile profile menu start---- */}
              <h2
                className="cursor-pointer relative"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <FaUserCircle size={30} className="mt-1" />
                {openMenu && <ProfileMenu />}
              </h2>
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
          open ? "right-0" : "-right-full"
        } fixed  top-0 bottom-0 lg:hidden bg-black text-white z-20 w-48 transition-all duration-300`}
      >
        <IoClose
          onClick={() => setOpen(false)}
          className="text-3xl absolute left-4 top-6 cursor-pointer"
        />
        <ul className="flex flex-col items-center justify-center h-full space-y-8 font-secondary">
          <li className="nav-link">
            <a href="#">Home</a>
          </li>
          <li className="nav-link">
            <a href="#">Company</a>
          </li>
          <li className="nav-link">
            <a href="#">Features</a>
          </li>
          <li className="btn">
            <a href="#">Signup</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

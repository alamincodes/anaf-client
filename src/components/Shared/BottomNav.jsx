import React, { useEffect } from "react";
// import Logo from "../../assets/logo/A.svg";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineDocumentText, HiOutlineHome } from "react-icons/hi2";
const BottomNav = ({ setOpen }) => {
  
  return (
    <div className="md:hidden print:hidden fixed -bottom-1 z-20 bg-neutral-900 text-white w-full py-5">
      <ul className="relative flex items-center justify-between px-5">
        <div>
          <li
            onClick={() => setOpen(true)}
            className="w-full h-full flex flex-col items-center"
          >
            <span>
              <HiOutlineMenu size={25} />
            </span>
            <span className="text-xs">Menu</span>
          </li>
        </div>
        <a href="tel:01630328733">
          <li className="w-full h-full flex flex-col items-center">
            <span>
              <HiOutlinePhone size={25} />
            </span>
            <span className="text-xs">Call</span>
          </li>
        </a>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-orange-500" : "text-black"
          }
        >
          <li className="w-full h-full flex flex-col justify-center items-center  -mt-7">
            <h5 className="flex items-center justify-center bg-white  rounded-full p-2 border-4 border-neutral-900">
              {" "}
              <HiOutlineHome size={40} />{" "}
            </h5>
            {/* <span className="text-xs">Home</span> */}
          </li>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "text-orange-500" : undefined
          }
        >
          <li className="w-full h-full flex flex-col items-center">
            <span>
              <HiOutlineDocumentText size={25} />
            </span>
            <span className="text-xs">Orders</span>
          </li>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-orange-500" : undefined
          }
        >
          <li className="w-full h-full flex flex-col items-center">
            <span>
              <FaRegUser size={25} />
            </span>
            <span className="text-xs">Profile</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default BottomNav;

import React, { useEffect } from "react";
import Logo from "../../assets/logo/A.svg";
import { FaRegUser } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
const BottomNav = ({ open, setOpen }) => {
  return (
    <div className="md:hidden fixed -bottom-1 z-20 bg-neutral-900 text-white w-full py-5">
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
        <Link to="/">
          <li className="w-full h-full bg-white rounded-full p-2 -mt-7 border-4 border-neutral-900">
            <img src={Logo} className="h-10 w-10 object-fill" alt="" />
          </li>
        </Link>

        <Link to="/orders">
          <li className="w-full h-full flex flex-col items-center">
            <span>
              <BsBox size={25} />
            </span>
            <span className="text-xs">Orders</span>
          </li>
        </Link>
        <Link to="/profile">
          <li className="w-full h-full flex flex-col items-center">
            <span>
              <FaRegUser size={25} />
            </span>
            <span className="text-xs">Profile</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BottomNav;

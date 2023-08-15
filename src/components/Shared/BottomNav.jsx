import React from "react";
import Logo from "../../assets/logo/A.svg";
import { TbUser } from "react-icons/tb";
import { BsBox } from "react-icons/bs";
import { HiOutlinePhone } from "react-icons/hi";
import { RiHeadphoneLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const BottomNav = () => {
  return (
    <div className="md:hidden fixed -bottom-1 z-20 bg-neutral-900 text-white w-full py-5">
      <ul className="relative flex items-center justify-center space-x-6">
        <Link to="/contact">
          <li className="flex flex-col items-center">
            <span>
              <RiHeadphoneLine size={25} />
            </span>
            <span className="text-xs">Support</span>
          </li>
        </Link>
        <a href="tel:01630328733">
          <li className="flex flex-col items-center">
            <span>
              <HiOutlinePhone size={25} />
            </span>
            <span className="text-xs">Call</span>
          </li>
        </a>
        <Link to="/">
          <li className="bg-white rounded-full p-2 -mt-7 border-4 border-neutral-900">
            <img src={Logo} className="h-10 w-10 object-fill" alt="" />
          </li>
        </Link>

        <Link to="/orders">
          <li className="flex flex-col items-center">
            <span>
              <BsBox size={25} />
            </span>
            <span className="text-xs">Orders</span>
          </li>
        </Link>
        <Link to="/settings/general">
          <li className="flex flex-col items-center">
            <span>
              <TbUser size={25} />
            </span>
            <span className="text-xs">Account</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BottomNav;

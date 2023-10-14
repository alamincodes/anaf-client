import React, { useContext, useEffect } from "react";
import {
  HiDocumentText,
  HiUserCircle,
  HiMenuAlt1,
  HiPhoneOutgoing,
  HiHome,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { TOOLS_PROVIDER } from "../../context/ToolsProvider";
const BottomNav = () => {
  const { setOpenMenu } = useContext(TOOLS_PROVIDER);
  return (
    <div className="md:hidden print:hidden fixed left-0 -bottom-1 z-20 bg-neutral-900 text-white w-full py-5 h-[73px]">
      <ul className="relative flex items-center justify-between px-5">
        <div>
          <li
            onClick={() => setOpenMenu(true)}
            className="w-full h-full flex flex-col items-center"
          >
            <span>
              <HiMenuAlt1 size={25} />
            </span>
            <span className="text-xs">Menu</span>
          </li>
        </div>
        <a href="tel:01630328733">
          <li className="w-full h-full flex flex-col items-center">
            <span>
              <HiPhoneOutgoing size={25} />
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
          <li className="w-full h-full flex flex-col justify-center items-center  -mt-8">
            <h5 className="flex items-center justify-center bg-white  rounded-full p-2 border-4 border-neutral-900">
              {" "}
              <HiHome size={40} />{" "}
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
              <HiDocumentText size={25} />
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
              <HiUserCircle size={25} />
            </span>
            <span className="text-xs">Profile</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default BottomNav;

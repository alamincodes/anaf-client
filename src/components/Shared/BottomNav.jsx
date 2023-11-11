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
import {
  navOrderIcon,
  navUserIcon,
  navPhoneIcon,
  navMenuIcon,
} from "./icons/svgIcons";

const BottomNav = () => {
  const { setOpenMenu } = useContext(TOOLS_PROVIDER);
  return (
    <section className=" relative">
      <div className="md:hidden print:hidden fixed -bottom-1  z-20 bg-white/70 backdrop-blur-3xl text-black  w-full py-5 h-[73px]">
        <ul className="relative flex items-center justify-between px-5">
          <div>
            <li
              onClick={() => setOpenMenu(true)}
              className="w-full h-full flex flex-col items-center"
            >
              <span>{navMenuIcon()}</span>
              <span className="text-xs">Menu</span>
            </li>
          </div>
          <a href="tel:01630328733">
            <li className="w-full h-full flex flex-col items-center">
              <span>{navPhoneIcon()}</span>
              <span className="text-xs">Call</span>
            </li>
          </a>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "text-white"
            }
          >
            <li className="w-full h-full flex flex-col justify-center items-center  -mt-8">
              <h5 className="flex items-center justify-center bg-neutral-900 rounded-full p-2 border-4 border-orange-500">
                {" "}
                <HiHome size={40} />{" "}
              </h5>
            </li>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : undefined
            }
          >
            <li className="w-full h-full flex flex-col items-center">
              <span>{navOrderIcon()}</span>
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
              <span>{navUserIcon()}</span>
              <span className="text-xs">Profile</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </section>
  );
};

export default BottomNav;

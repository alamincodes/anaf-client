import React, { useContext, useEffect } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useState } from "react";

const ProfileMenu = () => {
  const { user, logOut } = useContext(AUTH_CONTEXT);

  return (
    <div
      className="absolute md:right-3 right-1 md:top-6 top-12 border bg-white w-[200px] text-base z-50 list-none divide-y divide-gray-100 rounded shadow-boxShadow my-4"
      id="dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-md">{user?.displayName}</span>
        <span className="block text-sm font-medium text-gray-900 truncate">
          {user?.email}
        </span>
      </div>
      <ul className="py-1" aria-labelledby="dropdown">
        <li>
          <a
            href="#"
            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
          >
            Earnings
          </a>
        </li>
        <li onClick={logOut} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;

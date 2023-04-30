import React from "react";

const ProfileMenu = () => {
  return (
    <div
      className="absolute right-0 bg-white w-[200px] text-base z-50 list-none divide-y divide-gray-100 rounded my-4"
      id="dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-sm">Bonnie Green</span>
        <span className="block text-sm font-medium text-gray-900 truncate">
          name@flowbite.com
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
        <li>
          <a
            href="#"
            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;

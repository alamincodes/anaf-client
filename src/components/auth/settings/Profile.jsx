import React, { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useTitle from "../../../hooks/useTitle";
import AnimatePage from "../../Shared/AnimatePage";
import { Link } from "react-router-dom";
import UpdateAddressModal from "../../update-user-address/UpdateAddressModal";
import { useQuery } from "@tanstack/react-query";
import UserOrderCounter from "../../orders/UserOrderCounter";
import {
  locationIcon,
  mailIcon,
  navPhoneIcon,
  navUserIcon,
  userIcon,
} from "../../Shared/icons/svgIcons";

const Profile = () => {
  useTitle("Profile");
  const { user, logOut } = useContext(AUTH_CONTEXT);
  const [openModal, setOpenModal] = useState(false);
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(
        `https://anaf-server.vercel.app/users?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("accessToken");
        return logOut();
      }
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <div className="myContainer mb-3">
        <div className="bg-white shadow-cardShadow mt-2 rounded-xl ">
          <h2 className="font-bold text-orange-500 text-2xl pl-5 pt-3">
            Profile
          </h2>
          {/* user order counter */}
          <div className="flex justify-between lg:items-center lg:flex-row flex-col-reverse pb-4">
            <div className="lg:w-[50%] p-5">
              <div>
                <ul className="bg-neutral-50 p-5 space-y-3 font-semibold">
                  <li className="flex ">
                    <span className="mr-2">{navUserIcon()}</span>
                    {userData.name}
                  </li>
                  <li className="flex ">
                    <span className="mr-2">{mailIcon()}</span> {userData.email}
                  </li>
                  <li className="flex ">
                    <span className="mr-2">{navPhoneIcon()}</span>
                    {userData.phone}
                  </li>

                  <li className="flex">
                    <span className="mr-2">{locationIcon()}</span>
                    <span>
                      {userData.district}, {userData.address}
                    </span>
                  </li>
                </ul>
                {/* btn */}
                <div className="flex items-center md:flex-row flex-col mt-5 md:space-x-2 space-y-2 md:space-y-0">
                  <Link to="/settings/general" className="w-full">
                    <button className="bg-neutral-800 text-white px-6 py-2 rounded-full w-full">
                      update Name
                    </button>
                  </Link>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="bg-neutral-800 text-white px-6 py-2 rounded-full w-full"
                  >
                    Update Address
                  </button>
                  <Link to="/settings/changePassword" className="w-full">
                    <button className="bg-neutral-800 text-white px-6 py-2 rounded-full w-full">
                      Change password
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-[50%]">
              <UserOrderCounter user={user} />
            </div>
          </div>
          {/* -------<>------- */}
        </div>

        {openModal && (
          <UpdateAddressModal
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </AnimatePage>
  );
};

export default Profile;

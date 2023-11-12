import React, { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useTitle from "../../../hooks/useTitle";
import AnimatePage from "../../Shared/AnimatePage";
import { Link } from "react-router-dom";
import UpdateAddressModal from "../../update-user-address/UpdateAddressModal";
import { useQuery } from "@tanstack/react-query";
import UserOrderCounter from "../../orders/UserOrderCounter";

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
        <div className="bg-white  shadow-cardShadow p-5 mt-2">
          <h2 className="font-bold text-orange-500 text-2xl ">Profile</h2>
          {/* user order counter */}
          <div className="flex justify-center">
            <UserOrderCounter user={user} />
          </div>
          {/* -------<>------- */}
          <div>
            <div className="flex justify-between items-center">
              <h5 className="font-bold">Name</h5>
              <Link to="/settings/general">
                <h5 className="underline text-orange-400">Update</h5>
              </Link>
            </div>
            <h2 className="bg-neutral-100 p-2">{userData.name}</h2>
          </div>
          <div className="mt-2">
            <label className="font-bold">Email address</label>
            <h2 className=" bg-neutral-100 p-2">{userData.email}</h2>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <h5 className="font-bold">Phone number</h5>
            </div>
            <h2 className=" bg-neutral-100 p-2">{userData.phone}</h2>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <h5 className="font-bold">Delivery Address</h5>

              <button
                onClick={() => setOpenModal(true)}
                className="underline text-orange-400 font-semibold"
              >
                Update
              </button>
            </div>
            <h2 className=" bg-neutral-100 p-2">{userData.address}</h2>
          </div>
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

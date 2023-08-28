import React, { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useTitle from "../../../hooks/useTitle";
import AnimatePage from "../../Shared/AnimatePage";

const Profile = () => {
  useTitle("Profile");
  const { user } = useContext(AUTH_CONTEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserData(data);
        setIsLoading(false);
      });
  }, [user]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <div className="myContainer">
        <h2 className="font-bold text-2xl mt-2">Profile</h2>
        <div className="bg-white shadow-cardShadow p-5">
          <div>
            <label>Full Name</label>
            <h2 className=" bg-neutral-100 p-2">{userData.name}</h2>
          </div>
          <div className="mt-2">
            <label>Email address</label>
            <h2 className=" bg-neutral-100 p-2">{userData.email}</h2>
          </div>
          <div className="mt-2">
            <label>Phone number</label>
            <h2 className=" bg-neutral-100 p-2">{userData.phone}</h2>
          </div>
          <div className="mt-2">
            <label>Address</label>
            <h2 className=" bg-neutral-100 p-2">{userData.address}</h2>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default Profile;

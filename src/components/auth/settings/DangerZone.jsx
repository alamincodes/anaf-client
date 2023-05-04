import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../../hooks/useTitle";
import AnimatePage from "../../Shared/AnimatePage";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";

const DangerZone = () => {
  useTitle("Danger zone");
  const { deleteUserAccount, user } = useContext(AUTH_CONTEXT);
  const [userFullInfo, setUserFullInfo] = useState({});
  const handleAccountDelete = (userId) => {
    deleteUserAccount()
      .then(() => {
        // console.log("firebase deleted");
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(`http://localhost:5000/user/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Account deleted successfully", {
            style: {
              border: "1px solid black",
              padding: "16px",
              color: "green",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          });
        }
      });

    console.log(userId);
  };
  useEffect(() => {
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserFullInfo(data);
      });
  }, [user]);

  return (
    <AnimatePage>
      <div>
        <div className="max-full mx-auto md:mt-3 bg-white p-8 shadow shadow-slate-300 font-normal">
          <h1 className="md:text-4xl text-3xl font-medium">Delete account</h1>
          <div className="bg-red-100 p-2 py-5 text-red-700 rounded-lg mt-4">
            <h2>Deleting your account will:</h2>
            <p>
              Permanently delete your profile, along with your authentication
              associations
            </p>
            <p>
              <b className="mr-1">Impotent:</b>
              Deleting your account is unrecoverable and cannot be undone. Feel
              free to contact{" "}
              <a
                href="mailto:anaffashion.com@gmail.com"
                className="font-semibold"
              >
                anaffashion.com@gmail.com
              </a>{" "}
              with any questions.
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={() => handleAccountDelete(userFullInfo?._id)}
              className="mt-3 bg-red-600 text-white p-2 px-4 rounded"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default DangerZone;

import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useTitle from "../../hooks/useTitle";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  useTitle("All users");
  const { logOut } = useContext(AUTH_CONTEXT);
  // const [users, setAllUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const handleMakeAdmin = (id) => {
    fetch(`https://anaf-server.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully make admin");
        refetch();
      });
  };

  const handleCancelAdmin = (id) => {
    fetch(`https://anaf-server.vercel.app/users/cancel/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Remove admin successfully");
          refetch();
        }
        // console.log(data);
      });
  };

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await fetch("https://anaf-server.vercel.app/allUsers", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data?.reverse();
    },
  });
  // useEffect(() => {
  //   fetch("https://anaf-server.vercel.app/allUsers")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllUsers(data);
  //       // console.log(data);
  //       setIsLoading(false);
  //     });
  // }, [users]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Make admin
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b odd:bg-gray-100 font-medium"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {user.name}
                        </td>

                        <td className="whitespace-nowrap flex items-center px-6 py-4 ">
                          {user?.role === "admin" && (
                            <span>
                              <MdVerified className="mr-1 text-lg text-green-500" />
                            </span>
                          )}
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          {user?.role === "admin" ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleCancelAdmin(user._id)}
                                className="bg-red-100 rounded text-red-700 p-2"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleMakeAdmin(user._id)}
                              className="bg-black rounded text-white p-2"
                            >
                              Make admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

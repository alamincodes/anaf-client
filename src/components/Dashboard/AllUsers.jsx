import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";

const AllUsers = () => {
  const [users, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleMakeAdmin = (id) => {
    fetch(`https://anaf-server.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  useEffect(() => {
    fetch("https://anaf-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        // console.log(data);
        setIsLoading(false);
      });
  }, [users]);

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

                        <td className="whitespace-nowrap px-6 py-4 ">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          {user?.role === "admin" ? (
                            <h2>
                              {" "}
                              <span className="bg-green-200 p-2 rounded-full text-green-700">
                                Admin
                              </span>{" "}
                            </h2>
                          ) : (
                            <button
                              onClick={() => handleMakeAdmin(user._id)}
                              className="bg-black text-white p-2"
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

import React, { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";
import AnimatePage from "../../Shared/AnimatePage";

const DeleteModal = ({ setOpen }) => {
  const { deleteUserAccount, user, loginUser, setLoading } =
    useContext(AUTH_CONTEXT);
  const [userFullInfo, setUserFullInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [getPassword, setGetPassword] = useState("");

  const handleAccountDelete = (userId) => {
    if (getPassword.length === 0) {
      setErrorMessage("Password cannot be empty*");
      return;
    }
    setErrorMessage("");
    loginUser(user?.email, getPassword)
      .then(() => {
        fetch(`https://anaf-server.vercel.app/user/${userId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount > 0) {
              deleteUserAccount()
                .then(() => {
                  console.log("Account deleted");
                  localStorage.removeItem("accessToken");
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
                })
                .catch((error) => {
                  console.error(error);
                  setErrorMessage(error.message);
                  if (error.message.includes("requires-recent-login")) {
                    toast.success("To delete your account, log in again", {
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
            }
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.message.includes("wrong-password")) {
          setErrorMessage("Wrong password");
          toast.error("Wrong password, please provide valid password", {
            style: {
              border: "1px solid black",
              padding: "16px",
              color: "red",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          });
        } else if (error.message.includes("too-many-requests")) {
          setErrorMessage(error.message);
          toast.error(
            "Account has been temporarily disabled, try agin latter.",
            {
              style: {
                border: "1px solid black",
                padding: "16px",
                color: "red",
                fontWeight: "500",
              },
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            }
          );
        } else {
          setErrorMessage(error.message);
        }

        setLoading(false);
      });

    console.log(userId);
  };
  useEffect(() => {
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserFullInfo(data);
      });
  }, [user, errorMessage]);
  return (
    <AnimatePage>
      <div>
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex flex-col h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Deleted account
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete your account? All of
                          your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                      {/* password */}
                      <label htmlFor="password">
                        <p className="font-medium text-slate-700 pb-2">
                          Enter your password
                        </p>
                        <input
                          name="password"
                          type="password"
                          onChange={(e) => setGetPassword(e.target.value)}
                          className="w-full py-3 font-normal border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                          placeholder="Enter your password"
                        />
                      </label>
                      {errorMessage && (
                        <p className="font-normal text-red-600">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => handleAccountDelete(userFullInfo._id)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onFocus={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default DeleteModal;

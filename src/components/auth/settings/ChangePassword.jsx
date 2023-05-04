import React, { useContext, useState } from "react";
import useTitle from "../../../hooks/useTitle";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";
import SuccessModal from "../../Shared/SuccessModal";
import AnimatePage from "../../Shared/AnimatePage";

const ChangePassword = () => {
  useTitle("Change password");
  const { userUpdatePassword, loginUser, user, setLoading } =
    useContext(AUTH_CONTEXT);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const oldPassword = e.target.oldPassword.value;
    setErrorMessage("");
    if (
      password.length === 0 ||
      confirmPassword.length === 0 ||
      oldPassword.length === 0
    ) {
      setErrorMessage("Please provide password.");
      toast.error("Please provide password.", {
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
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password do not match");
      toast.error("Password do not match", {
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
      return;
    }
    loginUser(user?.email, oldPassword)
      .then(() => {
        userUpdatePassword(password)
          .then(() => {
            console.log("Success change");
            toast.error("Password change successfully", {
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
            setLoading(false);
          })
          .then((error) => {
            console.error(error);
          });
        setOpenModal(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Old password wrong", {
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
      });

    console.log(password, confirmPassword, errorMessage);
  };
  return (
    <AnimatePage>
      <div>
        <div className="max-full mx-auto md:mt-3 bg-white p-8 shadow shadow-slate-300">
          <h1 className="md:text-4xl text-3xl font-medium">Change password</h1>
          <form className="my-10" onSubmit={handleChangePassword}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Old password</p>
                <input
                  name="oldPassword"
                  type="password"
                  className="w-full py-3 font-normal border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">New password</p>
                <input
                  name="password"
                  type="password"
                  className="w-full py-3 font-normal border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">
                  Confirm password
                </p>
                <input
                  name="confirmPassword"
                  type="password"
                  className="w-full py-3 font-normal border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              {errorMessage && (
                <p className="text-red-500 font-normal">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-black border-indigo-500 inline-flex space-x-2 items-center justify-center"
              >
                <span>Change password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatePage>
  );
};

export default ChangePassword;

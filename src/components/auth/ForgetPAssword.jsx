import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineKey, HiExternalLink } from "react-icons/hi";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import ForgetSuccessModal from "./ForgetSuccessModal";
import LoadingSpinner from "../Shared/LoadingSpinner";
import AnimatePage from "../Shared/AnimatePage";

const ForgetPAssword = () => {
  const { forgetPassword } = useContext(AUTH_CONTEXT);
  const [errorText, setErrorText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/login");
  };
  const handleForget = (e) => {
    e.preventDefault();
    setErrorText("");
    setIsLoading(true);
    const form = e.target;
    const email = form.email.value;
    forgetPassword(email)
      .then(() => {
        console.log("Successfully reset");
        setOpenModal(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        const errMessage = error.message;
        if (errMessage.includes("user-not-found")) {
          setErrorText("User not found");
        } else if (errMessage.includes("too-many-requests")) {
          setErrorText("Too many request, Try agin latter.");
        } else if (errMessage.includes("missing-email")) {
          setErrorText("Please provide email.");
        } else {
          setErrorText(errMessage);
        }
        setIsLoading(false);
      });
    // console.log(email);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <>
        <div className="max-w-lg mx-auto md:mt-3 bg-white p-8 shadow shadow-slate-300">
          <h1 className="text-4xl font-medium">Reset password</h1>
          <p className="text-slate-500">
            Fill up the form to reset the password
          </p>

          <form onSubmit={handleForget} className="my-10">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Email address</p>
                <input
                  name="email"
                  type="email"
                  className="w-full py-3 font-normal border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              {/* error message */}
              <p className="text-red-500 font-normal">{errorText}</p>
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-black border-indigo-500 inline-flex space-x-2 items-center justify-center"
              >
                <HiOutlineKey size={20} />
                <span>Reset password</span>
              </button>

              {/* ---Sign up link--- */}
              <p className="text-center font-normal">
                Not sign up yet?
                <Link
                  to="/signUp"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span className="ml-1">Sign up now </span>
                  <span>
                    <HiExternalLink size={20} />
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
        {openModal && (
          <ForgetSuccessModal handleCloseModal={handleCloseModal} />
        )}
      </>
    </AnimatePage>
  );
};

export default ForgetPAssword;

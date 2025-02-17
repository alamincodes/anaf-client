import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo/anaf.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import useToken from "../../hooks/useToken";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Login = () => {
  useTitle("Login");
  const { loginUser } = useContext(AUTH_CONTEXT);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [jwtSendEmail, setJwtSendEmail] = useState("");
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = () => {
    const userToken = localStorage.getItem("accessToken");
    if (userToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [token] = useToken(jwtSendEmail);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }
  const handleSignIn = (data) => {
    setIsLoading(true);
    setErrorMessage("");
    loginUser(data.email, data.password)
      .then((result) => {
        // const user = result.user;
        const userEmail = data.email.toLowerCase();
        setJwtSendEmail(userEmail);
        setIsLoading(false);
        // console.log(user);
      })
      .catch((error) => {
        console.error(error);
        const errMessage = error.message;
        if (errMessage.includes("user-not-found")) {
          setErrorMessage("User not found");
        } else if (errMessage.includes("wrong-password")) {
          setErrorMessage("Incorrect password provided");
        } else if (errMessage.includes("user-disabled")) {
          setErrorMessage(
            "Your account has been disabled. Please speak to our customer support."
          );
        } else if (errMessage.includes("too-many-requests")) {
          setErrorMessage(
            "Your account has been temporarily disabled. Try again later."
          );
        } else if (errMessage.includes("invalid-email")) {
          setErrorMessage("invalid email");
        }
        setIsLoading(false);
      });
  };
  // console.log(errorMessage);

  return (
    <AnimatePage>
      <section>
        <div className="md:container md:mx-auto">
          {/* form */}
          <div className="flex justify-center items-center md:mt-5">
            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="py-5 md:px-10 px-5 bg-white shadow-cardShadow md:w-96 w-full"
            >
              <div className="flex justify-center items-center ">
                <h2 className="md:text-3xl text-2xl text-neutral-800 font-semibold md:my-5 my-2 uppercase">
                  Login
                </h2>
              </div>
              {/* email */}
              <div className="mt-4">
                <label>
                  <span className="font-[400] text-black">Your email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter your email"
                    className="border rounded-sm pr-9 outline-none font-normal p-2 w-full"
                  />
                  <span className="absolute right-2 -top-1 mt-[10px]">
                    <MdOutlineAlternateEmail
                      size={30}
                      className="cursor-pointer p-1"
                    />
                  </span>
                </div>

                {errors.email?.type === "required" && (
                  <p className="text-red-600 ">Email cannot be empty*</p>
                )}
              </div>
              {/* password */}
              <div className="">
                <label>
                  <span className="font-[400] text-black">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password cannot be empty*",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 character",
                      },
                    })}
                    placeholder="Enter your password"
                    className="border rounded-sm pr-10 outline-none font-normal p-2 w-full"
                  />
                  {showPassword ? (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className=" absolute right-2 mt-[6px] cursor-pointer"
                    >
                      <AiOutlineEyeInvisible
                        size={32}
                        className="cursor-pointer p-1"
                      />
                    </span>
                  ) : (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className=" absolute right-2 mt-[6px] cursor-pointer"
                    >
                      <AiOutlineEye size={32} className="p-1" />
                    </span>
                  )}
                </div>
                {errors?.password && (
                  <p className="text-red-600 ">
                    {" "}
                    <span>
                      {" "}
                      <exclamationTriangle className="h-5 w-5 text-yellow-400" />{" "}
                    </span>{" "}
                    {errors?.password?.message}
                  </p>
                )}
                {/* forget password  */}
                <Link to="/forgetPassword">
                  <p className="text-right font-normal hover:underline select-none">
                    Forget password?
                  </p>
                </Link>
              </div>
              {/* firebase error message */}
              {errorMessage && (
                <p className="text-red-600 font-semibold mt-1 bg-red-100 p-2 rounded-sm inline-flex items-center w-full">
                  <span>
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                  </span>
                  {errorMessage}
                </p>
              )}
              {/* submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black rounded text-white w-full mt-5 md:p-2 p-3 font-semibold select-none"
              >
                {isLoading ? (
                  <div className="flex justify-center item-center">
                    <svg
                      className="h-6 w-6 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              <p className="font-normal mt-4 select-none">
                New to ANAF?
                <Link to="/signUp" className="ml-1 text-orange-500">
                  <span>Create new account</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Login;

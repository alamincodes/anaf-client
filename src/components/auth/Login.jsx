import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo/anaf.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import useToken from "../../hooks/useToken";
const Login = () => {
  useTitle("Login");
  const { loginUser } = useContext(AUTH_CONTEXT);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [jwtSendEmail, setJwtSendEmail] = useState("");
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
  const handleSignUp = (data) => {
    // console.log(data);
    setIsLoading(true);
    setErrorMessage("");
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setJwtSendEmail(data.email);
        setIsLoading(false);
        // console.log(user);
      })
      .catch((error) => {
        console.error(error);
        const errMessage = error.message;
        if (errMessage.includes("user-not-found")) {
          setErrorMessage("User not found");
        } else if (errMessage.includes("wrong-password")) {
          setErrorMessage("Wrong password");
        }
        setIsLoading(false);
      });
  };

  return (
    <AnimatePage>
      <div>
        <div className="md:container  md:mx-auto">
          {/* form */}
          <div className="flex justify-center items-center mt-10">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="p-10 w-96 bg-white"
            >
              <div className="flex flex-col justify-center items-center ">
                <img
                  src={logo}
                  className="w-20 rounded-full h-20 px-2 bg-[#FAF5F2]"
                  alt=""
                />

                <h2 className="md:text-3xl text-2xl font-normal mt-2 font-secondary">
                  Login
                </h2>
              </div>
              {/* email */}
              <div className="">
                <label>
                  <span className="font-[400] text-black">Your email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter your email"
                    className="border rounded-sm outline-none font-normal p-2 w-full"
                  />
                  <span className=" absolute right-3 mt-[10px]">
                    <MdOutlineAlternateEmail
                      size={22}
                      className="cursor-pointer"
                    />
                  </span>
                </div>

                {errors.email?.type === "required" && (
                  <p className="text-red-600 font-semibold">
                    Please provide email*
                  </p>
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
                      required: "Please provide password",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 character",
                      },
                    })}
                    placeholder="Enter your password"
                    className="border rounded-sm outline-none font-normal p-2 w-full"
                  />
                  {showPassword ? (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className=" absolute right-3 mt-[10px]"
                    >
                      <AiOutlineEyeInvisible
                        size={25}
                        className="cursor-pointer"
                      />
                    </span>
                  ) : (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className=" absolute right-3 mt-[10px] cursor-pointer"
                    >
                      <AiOutlineEye size={25} />
                    </span>
                  )}
                </div>
                {errors?.password && (
                  <p className="text-red-600 font-semibold">
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
                <p className="text-red-500 mt-1 font-normal">{errorMessage}</p>
              )}
              {/* submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white w-full mt-5 p-2 font-semibold select-none"
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-2 w-5 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#ffff"
                      ></path>
                    </svg>
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="font-normal mt-4 select-none">
                New to ANAF?
                <Link to="/signUp" className="ml-1 text-violet-500">
                  <span>Create new account</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default Login;

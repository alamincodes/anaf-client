import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo/anaf.svg";
import { Link } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
const Login = () => {
  const { loginUser } = useContext(AUTH_CONTEXT);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleSignUp = (data) => {
    console.log(data);
    setErrorMessage("")
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message;
        if (errorMessage.includes("user-not-found")) {
          setErrorMessage("User not found");
        }else if(errorMessage.includes("wrong-password")){
          setErrorMessage("Wrong password")
        }
      });
  };
  return (
    <div>
      <div className="md:container  md:mx-auto">
        <div className="flex flex-col justify-center items-center mt-10">
          <img src={logo} className="w-28" alt="" />
          <h2 className="text-3xl font-bold font-secondary">Login</h2>
        </div>
        {/* form */}
        <div className="flex justify-center items-center mt-10">
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="p-10 w-96 bg-white"
          >
            {/* email */}
            <div className="">
              <label>
                <span className="font-[400] text-black">Your email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="border rounded-sm outline-none font-normal p-2 w-full"
              />
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
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter your email"
                className="border rounded-sm outline-none font-normal p-2 w-full"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600 font-semibold">
                  Please provide password*
                </p>
              )}
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="bg-black text-white w-full mt-5 p-2 font-semibold"
            >
              Sign up
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-1 font-medium">{errorMessage}</p>
            )}
            <p className="font-normal mt-4">
              New to ANAF?
              <Link to="/signUp" className="ml-1 text-violet-500">
                <span>Create new account</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

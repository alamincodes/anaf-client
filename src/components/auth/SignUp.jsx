import React, { useContext, useState } from "react";
import logo from "../../assets/logo/anaf.svg";
import { useForm } from "react-hook-form";
import { divisions } from "../BD_DISTRICTS_DIVISION/divisions";
import { districts } from "../BD_DISTRICTS_DIVISION/districts";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useToken from "../../hooks/useToken";
const SignUp = () => {
  // useTitle
  useTitle("Sign up");
  const { createUser, updateName, user } = useContext(AUTH_CONTEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [jwtSendEmail, setJwtSendEmail] = useState("");

  // useForm
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [token] = useToken(jwtSendEmail);
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }

  const handleSignUp = (data) => {
    setErrorMessage("");
    setIsLoading(true);
    // console.log(data);
    // console.log(data.email);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        updateName(data.name);
        toast.success("Welcome to ANAF", {
          style: {
            border: "1px solid #1e1e20",
            padding: "16px",
            color: "black",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "black",
            secondary: "white",
          },
        });

        const userInfo = {
          name: data.name,
          email: data.email.toLowerCase(),
          phone: data.phone,
          division: data.division,
          district: data.district,
          address: data.address,
        };
        fetch("https://anaf-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.acknowledged) {
              setJwtSendEmail(user?.email);
              setIsLoading(false);
            }
          });
      })
      .catch((error) => {
        console.error(error);
        const errMessage = error.message;
        if (errMessage.includes("email-already-in-use")) {
          setErrorMessage("Email already used, try another email.");
        } else if (errMessage.includes("invalid-email")) {
          setErrorMessage("invalid email");
        }
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatePage>
      <div>
        <div className="md:container md:mx-auto md:mt-9">
          {/* form */}
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="py-5 md:px-10 px-5 bg-white md:w-auto w-full"
            >
              {/* logo */}
              <div className="flex justify-center items-center ">
                <h2 className="md:text-3xl text-2xl mt-2 uppercase font-semibold">
                  Sign up
                </h2>
              </div>
              <div className="flex md:flex-row flex-col md:gap-4 mt-10">
                {/*  --------part 1-------- */}
                <div>
                  {/* name */}
                  <div className="">
                    <label>
                      <span className="font-[400] text-black">Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Name"
                      className="border rounded-sm outline-none font-normal p-2 w-full"
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-red-600 ">Name name is required*</p>
                    )}
                  </div>
                  {/* email */}
                  <div className="">
                    <label>
                      <span className="font-[400] text-black">Email</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="Enter your email"
                      className="border rounded-sm outline-none font-normal p-2 w-full"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-600 ">Email is required*</p>
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
                        {errors?.password?.message}
                      </p>
                    )}
                  </div>
                  {/* phone */}
                  <div>
                    <label>
                      <span className="font-[400] text-black">Phone</span>
                    </label>
                    <input
                      type="number"
                      {...register("phone", { required: true })}
                      placeholder="Enter your phone number"
                      className="border rounded-sm outline-none font-normal p-2 w-full"
                    />
                    {errors.phone?.type === "required" && (
                      <p className="text-red-600 ">Number is required*</p>
                    )}
                  </div>
                </div>
                {/* --------part 2----*/}
                <div>
                  {/* divisions */}
                  <div className="flex flex-col">
                    <label>
                      <span className="font-[400] text-black">Division</span>
                    </label>
                    <select
                      {...register("division")}
                      className="border rounded-sm outline-none font-normal p-2 w-full "
                    >
                      {divisions.map((division) => (
                        <option key={division.id} value={division.name}>
                          {division.name}
                        </option>
                      ))}
                    </select>
                    {errors.division?.type === "required" && (
                      <p className="text-red-600 ">Division is required*</p>
                    )}
                  </div>
                  {/* districts */}
                  <div className="flex flex-col">
                    <label>
                      <span className="font-[400] text-black">District</span>
                    </label>
                    <select
                      {...register("district")}
                      className="border rounded-sm outline-none font-normal p-2 w-full "
                    >
                      {districts.map((district) => (
                        <option key={district.id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {errors.district?.type === "required" && (
                      <p className="text-red-600 ">District is required*</p>
                    )}
                  </div>
                  {/* Address */}
                  <div className="">
                    <label>
                      <span className="font-[400] text-black">Address</span>
                    </label>
                    <textarea
                      type="text"
                      rows="2"
                      {...register("address", { required: true })}
                      placeholder="Enter your address"
                      className="border rounded-sm outline-none font-normal p-2 w-full"
                    />
                    {errors.address?.type === "required" && (
                      <p className="text-red-600 ">Address is required*</p>
                    )}
                  </div>
                </div>
              </div>
              {/* error message */}
              {errorMessage && (
                <p className="text-red-500 mt-1 font-normal">{errorMessage}</p>
              )}
              {/* submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black rounded disabled:bg-gray-400 text-white w-full mt-5 p-2 font-semibold"
              >
                Sign up
              </button>

              <p className="font-normal mt-4">
                Already have an account?
                <Link to="/login" className="ml-1 text-orange-500">
                  <span>Please login</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default SignUp;

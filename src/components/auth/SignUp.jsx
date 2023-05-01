import React, { useContext, useState } from "react";
import logo from "../../assets/logo/anaf.svg";
import { useForm } from "react-hook-form";
import { divisions } from "../BD_DISTRICTS_DIVISION/divisions";
import { districts } from "../BD_DISTRICTS_DIVISION/districts";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

const SignUp = () => {
  const { createUser, updateName } = useContext(AUTH_CONTEXT);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const handleSignUp = (data) => {
    console.log(data);

    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);


    const imageBBApiKey = import.meta.env.VITE_IMAGE_BB_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateName(data.name)
        navigate("/")
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imageData) => {
            console.log(imageData);
            if (imageData.success) {
              const userInfo = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                division: data.division,
                district: data.district,
                address: data.address,
                profileImg: imageData.data.url,
              };
              fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userInfo),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (result.acknowledged) {
                    // toast.success(`${data.name} is added`);
                    
                    // setLoading(false);
                  }
                });
            }
          });
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div>
      <div className="md:container  md:mx-auto">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} className="w-28" alt="" />
          <h2 className="text-3xl font-bold font-secondary">Welcome to ANAF</h2>
        </div>
        {/* form */}
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="p-10 w-96 bg-white"
          >
            {/* profile photo */}
            <div className=" flex justify-center">
              <label className="border-2 border-dashed border-black flex justify-center items-center w-28 h-28 rounded-full">
                <div className="flex flex-col">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xs">Upload photo</h2>
                </div>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="sr-only"
                />
              </label>
            </div>

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
                <p className="text-red-600 font-semibold">
                  Name name is required*
                </p>
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
                <p className="text-red-600 font-semibold">Email is required*</p>
              )}
            </div>
            {/* password */}
            <div className="">
              <label>
                <span className="font-[400] text-black">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 character",
                  },
                })}
                placeholder="Enter your password"
                className="border rounded-sm outline-none font-normal p-2 w-full"
              />
              {errors?.password && (
                <p className="text-red-600 font-semibold">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            {/* Phone */}
            <div className="">
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
                <p className="text-red-600 font-semibold">
                  Number is required*
                </p>
              )}
            </div>
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
                <p className="text-red-600 font-semibold">
                  Division is required*
                </p>
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
                <p className="text-red-600 font-semibold">
                  District is required*
                </p>
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
                <p className="text-red-600 font-semibold">
                  Address is required*
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
            <p className="font-normal mt-4">
              Already have an account?
              <Link to="/login" className="ml-1 text-violet-500">
                <span>Please login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

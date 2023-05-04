import React, { useContext } from "react";
import useTitle from "../../../hooks/useTitle";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";
import AnimatePage from "../../Shared/AnimatePage";
import { toast } from "react-hot-toast";

const General = () => {
  useTitle("General");
  const { user, updateName } = useContext(AUTH_CONTEXT);
  const handleUserUpdateName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (name.length === 0) {
      toast.error("Please provide name.", {
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
      return;
    }
    console.log(name);
    updateName(name)
      .then(() => {
        toast.error("Name change successfully", {
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
        console.log("Success name update");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AnimatePage>
      <div>
        <div className="max-full mx-auto md:mt-3 bg-white p-8 shadow shadow-slate-300">
          <h1 className="md:text-4xl text-3xl font-medium">Update name</h1>
          <form className="my-10" onSubmit={handleUserUpdateName}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Name</p>
                <input
                  name="name"
                  type="text"
                  defaultValue={user.displayName}
                  className="w-full py-3 font-normal border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              {/* error message */}
              {/* <p className="text-red-500 font-normal">{errorText}</p> */}
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-black border-indigo-500 inline-flex space-x-2 items-center justify-center"
              >
                <span>Update name</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatePage>
  );
};

export default General;

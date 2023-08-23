import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="grid h-[500px] px-4 place-content-center">
      <div className="flex flex-col items-center">
        <h1 className="tracking-widest text-gray-500 uppercase">
          404 | Not Found
        </h1>
        <Link to="/">
          <button className="px-4 py-2 bg-black text-white rounded mt-4">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

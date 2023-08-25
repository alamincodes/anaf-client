import React from "react";
import { Link } from "react-router-dom";
import { BsFire } from "react-icons/bs";
const Category = ({ category }) => {
  return (
    <div>
      <Link key={category.id} to={`/products/${category.query}`}>
        <div className="hover:transition-all h-full hover:duration-300 group relative p-3">
          {category.hotSeal === true && (
            <span className="absolute bg-red-100 p-1 rounded-full top-1 right-1">
              <BsFire size={17} className="text-red-700" />{" "}
            </span>
          )}
          <div className="flex flex-col justify-center items-center py-1">
            <img
              src={category.icon}
              className="w-14 h-14 object-cover"
              alt={category.name}
            />
            <h2 className="mt-2 uppercase text-xs group-hover:text-orange-500 group-hover:font-medium text-gray-600 transition-all text-center md:text-sm ">
              {category.name}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Category;

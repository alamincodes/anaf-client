import React from "react";
import fan from "../../../assets/categories/fan.svg";
import microphone from "../../../assets/categories/microphone.svg";
import powerBank from "../../../assets/categories/powerBank.svg";
import router from "../../../assets/categories/router.svg";
import tripod from "../../../assets/categories/tripod.svg";
import watch from "../../../assets/categories/watch.svg";
import headphone from "../../../assets/categories/headphone.svg";
import mouse from "../../../assets/categories/mouse.svg";
import { Link } from "react-router-dom";
import { BsFire } from "react-icons/bs";
const Categories = () => {
  const categories = [
    {
      id: 7,
      name: "Headphones",
      query: "headphones",
      icon: headphone,
      hotSeal: true,
    },
    {
      id: 6,
      name: "Smart watches",
      query: "smartWatches",
      icon: watch,
      hotSeal: true,
    },
    {
      id: 4,
      name: "Rechargeable Fan",
      query: "rechargeableFan",
      icon: fan,
      hotSeal: true,
    },
    {
      id: 1,
      name: "Power Bank",
      query: "powerBank",
      icon: powerBank,
      hotSeal: false,
    },
    {
      id: 2,
      name: "Tripod",
      query: "tripod",
      icon: tripod,
      hotSeal: false,
    },
    {
      id: 3,
      name: "Microphone",
      query: "microphone",
      icon: microphone,
      hotSeal: false,
    },
    {
      id: 5,
      name: "Router",
      query: "router",
      icon: router,
      hotSeal: false,
    },

    {
      id: 8,
      name: "mouse",
      query: "mouse",
      icon: mouse,
      hotSeal: false,
    },
  ];
  return (
    <div className="md:container md:mx-auto mt-5 bg-white shadow-cardShadow p-5 rounded-xl">
      <div>
        <h2 className="md:text-3xl text-2xl font-bold text-center uppercase mb-5">
          Categories
        </h2>

        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-2">
          {categories.map((category) => {
            // console.log(category);
            return (
              <Link key={category.id} to={`/products/${category.query}`}>
                <div className=" hover:transition-all rounded-md hover:duration-300 bg-white group h-32 shadow hover:shadow-primary relative md:py-5 py-2">
                  {category.hotSeal === true && (
                    <span className="absolute bg-red-100 p-1 rounded-full top-1 right-1">
                      <BsFire size={17} className="text-red-700" />{" "}
                    </span>
                  )}
                  <div className="flex flex-col justify-center items-center py-1">
                    <img
                      src={category.icon}
                      className="w-10 h-14"
                      alt={category.name}
                    />
                    <h2 className="mt-2 uppercase text-xs group-hover:text-orange-500 group-hover:font-medium text-gray-600 transition-all text-center md:text-sm ">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;

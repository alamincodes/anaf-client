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
const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Power Bank",
      query: "powerBank",
      icon: powerBank,
    },
    {
      id: 2,
      name: "Tripod",
      query: "tripod",
      icon: tripod,
    },
    {
      id: 3,
      name: "Microphone",
      query: "microphone",
      icon: microphone,
    },
    {
      id: 4,
      name: "Rechargeable Fan",
      query: "rechargeableFan",
      icon: fan,
    },
    {
      id: 5,
      name: "Router",
      query: "router",
      icon: router,
    },
    {
      id: 6,
      name: "Smart watches",
      query: "smartWatches",
      icon: watch,
    },
    {
      id: 7,
      name: "Headphones",
      query: "headphones",
      icon: headphone,
    },
    {
      id: 8,
      name: "mouse",
      query: "mouse",
      icon: mouse,
    },
  ];
  return (
    <div className="container mx-auto">
      <div>
        <h2 className="md:text-3xl text-2xl font-bold text-center mt-20 uppercase mb-10">
          Categories
        </h2>

        <div className="grid md:grid-cols-5 grid-cols-2 gap-5">
          {categories.map((category) => {
            // console.log(category);
            return (
              <Link key={category.id} to={`/products/${category.query}`}>
                <div className="border group rounded shadow relative md:py-5 py-2 flex flex-col justify-center items-center">
                  <img
                    src={category.icon}
                    className="w-20 md:h-20 h-14 mb-14 "
                    alt=""
                  />
                  <h2 className="p-5 group-hover:text-black group-hover:font-medium text-gray-600 transition-all text-center absolute md:text-lg text-sm bottom-0">
                    {category.name}
                  </h2>
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

import React from "react";
import fan from "../../../assets/categories/fan.png";
import microphone from "../../../assets/categories/microphone.png";
import powerBank from "../../../assets/categories/powerBank.png";
import router from "../../../assets/categories/router.png";
import tripod from "../../../assets/categories/tripod.png";
import watch from "../../../assets/categories/watch.png";
import headphone from "../../../assets/categories/headphone.png";
import mouse from "../../../assets/categories/mouse.png";
import Category from "./Category";
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
    <div className="myContainer mt-5">
      <div className="bg-white shadow-cardShadow md:p-5 p-2 rounded-xl">
        <h2 className="md:text-3xl text-2xl font-bold text-center uppercase mb-5">
          Categories
        </h2>

        <div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-2">
          {categories.map((category) => (
            <Category category={category} key={category.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

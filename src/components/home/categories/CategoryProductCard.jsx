import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryProductCard = ({ category }) => {
  const [imageLoad, setImageLoad] = useState(false);
  const { name, img, price, _id } = category;

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoad(true);
    };
    image.src = img;
  }, [category]);
  return (
    <div className="relative">
      <div className="flex flex-col border rounded-lg md:h-[400px] h-[300px] border-gray-100 bg-white shadow-md">
        {!imageLoad && (
          <div className="p-5">
            <div className="loader lg:h-[250px] h-[120px] lg:before:w-[200px] before:w-[100%] lg:before:h-[200px] before:h-[120px]"></div>
          </div>
        )}
        {imageLoad && (
          <Link
            to={`/product/${_id}`}
            className="relative flex justify-center items-center md:h-[300px] h-[180px] overflow-hidden"
          >
            <img
              loading="lazy"
              className="lg:w-[300px] md:w-[250px] w-[150px] md:h-[300px] lg:p-5 p-2 h-[150px] object-cover bg-center bg-cover"
              src={img}
              alt="product image"
            />
          </Link>
        )}
        <div className="mt-1 md:px-5 px-2">
          <Link to={`/product/${_id}`}>
            <h5 className=" md:text-[15px] text-xs tracking-tight text-slate-900">
              {name}
            </h5>
          </Link>
          <div className="absolute bottom-2">
            <div>
              <p>
                <span className="md:text-xl text-lg font-bold text-slate-900">
                  TK.{price}
                </span>
                {/* <span className="text-sm text-slate-900 line-through">
                ${price}
              </span> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductCard;

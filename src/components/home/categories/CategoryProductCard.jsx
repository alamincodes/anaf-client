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
    <div className="relative border rounded-md border-gray-100 bg-white shadow">
      <div className="flex flex-col ">
        {!imageLoad && (
          <div className="p-5">
            <div className="loader lg:h-[250px] h-[120px] lg:before:w-[200px] before:w-[100%] lg:before:h-[200px] before:h-[120px]"></div>
          </div>
        )}
        <Link to={`/product/${_id}`}>
          {imageLoad && (
            <div className="relative flex justify-center items-center ">
              <img
                loading="lazy"
                className="lg:w-[100%] md:w-[250px] w-[150px] object-cover bg-center bg-cover lg:p-5 p-2 lg:rounded-3xl rounded-xl mb-4"
                src={img}
                alt="product image"
              />
            </div>
          )}
          <div className="mt-1 mb-10  md:px-5 px-2">
            <h5 className="md:text-[15px] text-xs tracking-tight text-slate-900">
              {name}
            </h5>

            <div className="absolute bottom-2 ">
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
        </Link>
      </div>
    </div>
  );
};

export default CategoryProductCard;

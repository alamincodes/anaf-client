import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiImage } from "react-icons/fi";
const Product = ({ product }) => {
  const [imageLoad, setImageLoad] = useState(false);
  const { name, img, price, _id, outOfStock } = product;

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoad(true);
    };
    image.src = img;
  }, [product]);
  return (
    <div className="relative group rounded-xl border border-gray-100 bg-white hover:shadow-lg duration-300">
      {outOfStock === "true" && (
        <div className="absolute rounded bg-red-500 text-white z-10 md:p-3 md:text-md text-xs p-1 right-0">
          <h2 className="font-bold">Out of stock</h2>
        </div>
      )}

      <div className="flex flex-col">
        {!imageLoad && (
          <div className="flex flex-col justify-center items-center md:h-[250px] h-[150px] lg:p-5 p-2">
            <span className="opacity-10 animate-pulse text-neutral-400">
              <FiImage size={100} />{" "}
            </span>
            <h2 className="lg:text-6xl text-3xl font-extrabold opacity-10 text-neutral-400 animate-pulse">
              ANAF
            </h2>
          </div>
        )}
        <Link to={`/product/${_id}`}>
          {imageLoad && (
            <div className="p-2 flex justify-center">
              <img
                loading="lazy"
                className="md:w-[200px] md:h-[200px] w-[120px] h-[120px] object-cover mb-4"
                src={img}
                alt="product image"
              />
            </div>
          )}
          <div className="md:px-3 px-2 border-t border-neutral-100">
            <div className="mt-1">
              <h5 className="md:text-[15px] group-hover:underline text-xs tracking-tight text-slate-900">
                {name?.length > 50 ? name.substr(0, 40) + "..." : name}
              </h5>
              <div className="md:my-5 my-2">
                <p>
                  <span
                    className={`md:text-lg ${
                      outOfStock === "true" && "line-through"
                    } text-lg font-bold text-orange-500`}
                  >
                    {price}৳
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

export default Product;

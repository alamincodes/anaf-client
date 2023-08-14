import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="relative border rounded-md border-gray-100 bg-white hover:shadow-lg duration-300">
      {outOfStock === "true" && (
        <div className="absolute rounded bg-red-500 text-white z-10 md:p-3 md:text-base text-xs p-1 right-0">
          <h2 className="font-bold">Out of stock</h2>
        </div>
      )}

      <div className="flex flex-col">
        {!imageLoad && (
          <div className="lg:p-5 p-2">
            <div className="loader lg:h-[250px] h-[120px] lg:before:w-[200px] before:w-[100%] lg:before:h-[200px] md:lg:before:h-[220px] before:h-[100px]"></div>
          </div>
        )}
        <Link to={`/product/${_id}`}>
          {imageLoad && (
            <div className="p-2 flex justify-center">
              <img
                loading="lazy"
                className=" md:w-[250px] md:h-[250px] w-[150px] h-[150px] object-cover mb-4"
                src={img}
                alt="product image"
              />
            </div>
          )}
          <div className="md:px-5 px-2">
            <div>
              <h5 className="md:text-[15px] text-xs tracking-tight text-slate-900">
                {name?.length > 50 ? name.substr(0, 40) + "..." : name}
              </h5>
              <div className="md:my-5 my-2">
                <p>
                  <span
                    className={`md:text-xl ${
                      outOfStock === "true" && "line-through"
                    } text-lg font-bold text-slate-900`}
                  >
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

export default Product;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchProduct = ({ searchProduct }) => {
  const [imageLoad, setImageLoad] = useState(false);
  const { name, img, price, _id } = searchProduct;
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoad(true);
    };
    image.src = img;
  }, []);
  return (
    <div className="relative border rounded-md border-gray-100 bg-white shadow">
      <div className="flex flex-col ">
        {!imageLoad && (
          <div className="lg:p-5 p-2">
            <div className="loader lg:h-[250px] h-[120px] lg:before:w-[200px] before:w-[100%] lg:before:h-[200px] md:lg:before:h-[220px] before:h-[100px]"></div>
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
          <div className="lg:mb-20 lg:mt-auto mt-24  md:px-5 px-2">
            <div className="absolute bottom-2">
              <h5 className="md:text-[15px] text-xs tracking-tight text-slate-900">
                {name.length > 50 ? name.substr(0, 40) + "..." : name}
              </h5>
              <div className="mt-5">
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

export default SearchProduct;
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Blurhash } from "react-blurhash";
import Skeleton from "react-loading-skeleton";

const Product = ({ product }) => {
  const { addItem } = useCart();
  const [imageLoad, setImageLoad] = useState(false);
  const { name, img, price, _id } = product;

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoad(true);
    };
    image.src = img;
  }, [product]);
  return (
    <div className="relative">
      <div className="flex flex-col border rounded-md md:h-[400px] h-[300px] border-gray-100 bg-white shadow">
        {!imageLoad && (
          <div className="p-5">
            <div className="loader lg:h-[250px] h-[120px] lg:before:w-[200px] before:w-[100%] lg:before:h-[200px] before:h-[120px]"></div>
          </div>
        )}
        <Link to={`/product/${_id}`}>
          {imageLoad && (
            <div className="relative flex justify-center items-center md:h-[300px] h-[180px] overflow-hidden">
              <img
                loading="lazy"
                className="lg:w-[100%] md:w-[250px] w-[150px] md:h-[300px] h-[150px] object-cover bg-center bg-cover lg:p-5 p-2 lg:rounded-3xl rounded-lg mb-4"
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

export default Product;

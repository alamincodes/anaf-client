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
    <div>
      <div className="flex flex-col border border-gray-100 bg-white shadow-md">
        {!imageLoad && (
          <>
            <div className="lg:hidden block p-1">
              <Skeleton height={190} />
            </div>
            <div className="hidden lg:block">
              <Blurhash
                hash="LYJ?ynrWTJb]ajS}w0oy}AtOE*OX"
                width={282}
                height={200}
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            </div>
          </>
        )}
        {imageLoad && (
          <Link
            to={`/product/${_id}`}
            className="relative flex h-48 overflow-hidden"
          >
            <img
              className="absolute top-0 right-0 w-full h-full object-cover"
              src={img}
              alt="product image"
            />
          </Link>
        )}
        <div className="mt-4 md:px-5 px-2 md:mb-5 mb-2">
          <Link to={`/product/${_id}`}>
            <h5 className="lg:text-lg md:text-md text-sm h-10 tracking-tight text-slate-900">
              {name}
            </h5>
          </Link>
          <div className="mb-4 flex items-center justify-between mt-4">
            <p>
              <span className="md:text-2xl text-lg font-bold text-slate-900">
                TK.{price}
              </span>
              {/* <span className="text-sm text-slate-900 line-through">
              ${price}
            </span> */}
            </p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex items-center w-full justify-center bg-gray-900 p-2 md:p-3 text-white hover:border-2 hover:border-black hover:text-black  hover:bg-transparent transition-all border-2 border-transparent sm:bg-none font-medium md:text-sm text-[10px]"
          >
            <HiOutlineShoppingBag className="md:text-2xl text-xl mr-1 mb-1" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

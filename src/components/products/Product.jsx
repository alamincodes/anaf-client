import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePhoto } from "react-icons/hi2";
import {
  HiCurrencyBangladeshi,
  HiOutlineShoppingBag,
  HiCheckCircle,
} from "react-icons/hi";
import { useCart } from "react-use-cart";
import useFavorite from "../../hooks/useFavorite";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Product = ({ product }) => {
  const [imageLoad, setImageLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const { user } = useContext(AUTH_CONTEXT);
  const { name, img, price, _id, outOfStock } = product;
  const { addItem } = useCart();

  // //! add to cart
  const handleAddToCart = () => {
    addItem(product);
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  };

  const {
    data: favProducts = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(
        `https://anaf-server.vercel.app/get-favorite-product?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  // ! post favorite product
  const handlePostFavProduct = () => {
    useFavorite(product, user?.email);
    refetch();
  };

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoad(true);
    };
    image.src = img;
  }, [product]);

  return (
    <div className="relative group rounded-xl border border-neutral-200 bg-white hover:shadow-lg duration-300 overflow-hidden">
      {outOfStock === "true" && (
        <div className="absolute rounded-bl uppercase bg-red-500 text-white z-10 md:p-3 md:text-md text-xs p-1 right-0">
          <h2 className="font-bold">Out of stock</h2>
        </div>
      )}
      {/* toast */}
      {isVisible && (
        <div className="show rounded-sm ring-4 ring-neutral-500 w-[300px] z-20 top-[84px] right-0 fixed text-white bg-neutral-900 p-5">
          <div className="flex items-center">
            <span>
              <HiCheckCircle size={23} className="text-green-500 mr-2" />
            </span>
            <p>
              Product added
              <Link to="/cart" className=" bg-orange-500 p-2 ml-3 rounded ">
                viwe cart
              </Link>
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        {!imageLoad && (
          <div className="flex flex-col justify-center items-center md:h-[250px] h-[150px] lg:p-5 p-2">
            <span className="opacity-10 animate-pulse text-neutral-400">
              <HiOutlinePhoto size={100} />
            </span>
            {/* logo */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="200"
                zoomAndPan="magnify"
                viewBox="0 0 150 74.999997"
                preserveAspectRatio="xMidYMid meet"
                version="1.0"
                className="opacity-10 animate-pulse w-28"
              >
                <defs>
                  <g />
                </defs>
                <g fill="#000000" fillOpacity="1">
                  <g transform="translate(0.92628, 63.035307)">
                    <g>
                      <path d="M 34.726562 -0.664062 L 17.917969 -43.90625 C 17.75 -44.351562 16.976562 -44.351562 16.8125 -43.90625 L 0.0546875 -0.664062 C -0.109375 -0.332031 0.109375 0 0.609375 0 L 8.183594 0 C 8.40625 0 8.683594 -0.109375 8.738281 -0.332031 L 17.363281 -24.996094 L 26.101562 -0.332031 C 26.15625 -0.109375 26.433594 0 26.597656 0 L 34.230469 0 C 34.617188 0 34.894531 -0.332031 34.726562 -0.664062 Z M 34.726562 -0.664062 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fillOpacity="1">
                  <g transform="translate(40.186681, 63.035307)">
                    <g>
                      <path d="M 36.609375 -44.238281 L 29.472656 -44.238281 C 29.085938 -44.238281 28.8125 -43.964844 28.8125 -43.742188 L 28.8125 -14.929688 L 8.40625 -44.074219 C 8.351562 -44.183594 8.019531 -44.238281 7.90625 -44.238281 L 0.554688 -44.238281 C 0.277344 -44.238281 0 -43.964844 0 -43.742188 L 0 -10.617188 L 8.460938 -10.617188 L 8.460938 -29.308594 L 28.8125 -0.164062 C 28.867188 -0.0546875 29.199219 0 29.308594 0 L 36.609375 0 C 36.996094 0 37.214844 -0.277344 37.214844 -0.496094 L 37.214844 -43.742188 C 37.214844 -43.964844 36.996094 -44.238281 36.609375 -44.238281 Z M 36.609375 -44.238281 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fillOpacity="1">
                  <g transform="translate(82.046001, 63.035307)">
                    <g>
                      <path d="M 34.726562 -0.664062 L 17.917969 -43.90625 C 17.75 -44.351562 16.976562 -44.351562 16.8125 -43.90625 L 0.0546875 -0.664062 C -0.109375 -0.332031 0.109375 0 0.609375 0 L 8.183594 0 C 8.40625 0 8.683594 -0.109375 8.738281 -0.332031 L 17.363281 -24.996094 L 26.101562 -0.332031 C 26.15625 -0.109375 26.433594 0 26.597656 0 L 34.230469 0 C 34.617188 0 34.894531 -0.332031 34.726562 -0.664062 Z M 34.726562 -0.664062 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fillOpacity="1">
                  <g transform="translate(121.306407, 63.035307)">
                    <g>
                      <path d="M 25.824219 -26.210938 L 8.460938 -26.210938 L 8.460938 -36.222656 L 21.015625 -36.222656 L 21.015625 -44.238281 L 0.609375 -44.238281 C 0.277344 -44.238281 0 -43.964844 0 -43.742188 L 0 -0.496094 C 0 -0.277344 0.277344 0 0.609375 0 L 8.460938 0 L 8.460938 -18.195312 L 25.824219 -18.195312 C 26.15625 -18.195312 26.433594 -18.46875 26.433594 -18.691406 L 26.433594 -25.714844 C 26.433594 -25.992188 26.15625 -26.210938 25.824219 -26.210938 Z M 25.824219 -26.210938 " />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        )}
        <Link to={`/product/${_id}`}>
          {imageLoad && (
            <div className="">
              <img
                loading="lazy"
                className="md:h-[200px] h-[120px] object-cover my-3 rounded-lg mx-auto"
                src={img}
                alt="product image"
              />
            </div>
          )}
        </Link>
        <div className="md:px-3 px-2 border-t border-neutral-100">
          <div className="mt-1">
            <h3
              className={`${
                outOfStock === "true" ? "text-red-600" : "text-blue-600"
              } text-sm my-1`}
            >
              {outOfStock === "false" ? "In Stock" : "Out of stock"}
            </h3>
            <Link to={`/product/${_id}`}>
              <h5 className="md:text-[15px] group-hover:underline text-xs font-[400] tracking-tight text-neutral-800">
                {name?.length > 50 ? name.substr(0, 40) + "..." : name}
              </h5>
            </Link>

            {/* price and add cart btn */}
            <div className="md:my-5 my-2 flex items-center justify-between">
              <p className="inline-flex items-center">
                <span>
                  <HiCurrencyBangladeshi
                    size={23}
                    className="text-orange-500"
                  />
                </span>
                <span
                  className={`md:text-lg ${
                    outOfStock === "true" && "line-through"
                  } text-lg font-bold text-orange-500`}
                >
                  {price}
                </span>

                {/* <span className="text-sm text-slate-900 line-through">
              ${price}
            </span> */}
              </p>
              {/* mobile btn */}
              <button
                onClick={handleAddToCart}
                className="bg-neutral-s100 inline-flex items-center hover:bg-neutral-200 rounded-full transition duration-300 p-1 text-xs"
                title="Add to cart"
              >
                <span className="text-black p-1">
                  {isVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 256 256"
                      fill="none"
                      id="my-svg"
                    >
                      <defs>
                        <pattern
                          id="a"
                          patternUnits="userSpaceOnUse"
                          width={80}
                          height={80}
                          patternTransform="scale(3.19) rotate(0)"
                        >
                          <rect
                            x={0}
                            y={0}
                            width="100%"
                            height="100%"
                            fill="hsla(0,0%,100%,1)"
                          />
                          <path
                            d="M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#ffc400"
                            fill="none"
                          />
                          <path
                            d="M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#ff8c00"
                            fill="none"
                          />
                          <path
                            d="M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#ff2a00"
                            fill="none"
                          />
                          <path
                            d="M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#cf0000"
                            fill="none"
                          />
                        </pattern>
                        <linearGradient id="gradient1">
                          <stop
                            className="stop1"
                            offset="0%"
                            stopColor="#8f66ff"
                          />
                          <stop
                            className="stop2"
                            offset="100%"
                            stopColor="#3d12ff"
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        id="backgr"
                        width={256}
                        height={256}
                        fill="none"
                        rx={60}
                      />
                      <g id="group" transform="translate(0,0) scale(1)">
                        <path
                          d="M64.000 53.333H224.000L213.333 160.000H85.333L64.000 53.333ZM64.000 53.333L53.333 32.000H32.000M117.333 208.000C117.333 216.836 110.170 224.000 101.333 224.000C92.497 224.000 85.333 216.836 85.333 208.000C85.333 199.164 92.497 192.000 101.333 192.000C110.170 192.000 117.333 199.164 117.333 208.000ZM213.333 208.000C213.333 216.836 206.170 224.000 197.333 224.000C188.497 224.000 181.333 216.836 181.333 208.000C181.333 199.164 188.497 192.000 197.333 192.000C206.170 192.000 213.333 199.164 213.333 208.000Z"
                          stroke="#000000"
                          strokeWidth={14}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          id="primary"
                        />
                        <path
                          d="M128.000 106.667L149.333 128.000L181.333 85.333"
                          stroke="url(#a)"
                          strokeWidth={14}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          id="secondary"
                        />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 256 256"
                      fill="none"
                      id="my-svg"
                    >
                      <defs>
                        <pattern
                          id="a"
                          patternUnits="userSpaceOnUse"
                          width={80}
                          height={80}
                          patternTransform="scale(3.19) rotate(0)"
                        >
                          <rect
                            x={0}
                            y={0}
                            width="100%"
                            height="100%"
                            fill="hsla(0,0%,100%,1)"
                          />
                          <path
                            d="M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#ffc400"
                            fill="none"
                          />
                          <path
                            d="M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#ff8c00"
                            fill="none"
                          />
                          <path
                            d="M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#ff2a00"
                            fill="none"
                          />
                          <path
                            d="M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                            strokeWidth={30}
                            stroke="#cf0000"
                            fill="none"
                          />
                        </pattern>
                        <linearGradient id="gradient1">
                          <stop
                            className="stop1"
                            offset="0%"
                            stopColor="#8f66ff"
                          />
                          <stop
                            className="stop2"
                            offset="100%"
                            stopColor="#3d12ff"
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        id="backgr"
                        width={256}
                        height={256}
                        fill="none"
                        rx={60}
                      />
                      <g id="group" transform="translate(0,0) scale(1)">
                        <path
                          d="M64.000 53.333H224.000L213.333 160.000H85.333L64.000 53.333ZM64.000 53.333L53.333 32.000H32.000M117.333 208.000C117.333 216.836 110.170 224.000 101.333 224.000C92.497 224.000 85.333 216.836 85.333 208.000C85.333 199.164 92.497 192.000 101.333 192.000C110.170 192.000 117.333 199.164 117.333 208.000ZM213.333 208.000C213.333 216.836 206.170 224.000 197.333 224.000C188.497 224.000 181.333 216.836 181.333 208.000C181.333 199.164 188.497 192.000 197.333 192.000C206.170 192.000 213.333 199.164 213.333 208.000Z"
                          stroke="#000000"
                          strokeWidth={14}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          id="primary"
                        />
                        <path
                          d="M149.333 85.333V106.667M149.333 106.667V128.000M149.333 106.667H128.000M149.333 106.667H170.667"
                          stroke="url(#a)"
                          strokeWidth={14}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          id="secondary"
                        />
                      </g>
                    </svg>
                  )}
                </span>
              </button>
              {/* desktop btn */}
              {/* <button
                onClick={handleAddToCart}
                className="bg-neutral-200 hidden lg:inline-flex items-center hover:bg-neutral-200 rounded-full transition duration-300 px-4 py-2 text-xs"
                title="Add to cart"
              >
                <span className="text-black mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    viewBox="0 0 256 256"
                    fill="none"
                    id="my-svg"
                  >
                    <defs>
                      <pattern
                        id="a"
                        patternUnits="userSpaceOnUse"
                        width={80}
                        height={80}
                        patternTransform="scale(3.19) rotate(0)"
                      >
                        <rect
                          x={0}
                          y={0}
                          width="100%"
                          height="100%"
                          fill="hsla(0,0%,100%,1)"
                        />
                        <path
                          d="M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                          strokeWidth={30}
                          stroke="#ffc400"
                          fill="none"
                        />
                        <path
                          d="M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                          strokeWidth={30}
                          stroke="#ff8c00"
                          fill="none"
                        />
                        <path
                          d="M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                          strokeWidth={30}
                          stroke="#ff2a00"
                          fill="none"
                        />
                        <path
                          d="M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                          strokeWidth={30}
                          stroke="#cf0000"
                          fill="none"
                        />
                      </pattern>
                      <linearGradient id="gradient1">
                        <stop
                          className="stop1"
                          offset="0%"
                          stopColor="#8f66ff"
                        />
                        <stop
                          className="stop2"
                          offset="100%"
                          stopColor="#3d12ff"
                        />
                      </linearGradient>
                    </defs>
                    <rect
                      id="backgr"
                      width={256}
                      height={256}
                      fill="none"
                      rx={60}
                    />
                    <g id="group" transform="translate(0,0) scale(1)">
                      <path
                        d="M64.000 53.333H224.000L213.333 160.000H85.333L64.000 53.333ZM64.000 53.333L53.333 32.000H32.000M117.333 208.000C117.333 216.836 110.170 224.000 101.333 224.000C92.497 224.000 85.333 216.836 85.333 208.000C85.333 199.164 92.497 192.000 101.333 192.000C110.170 192.000 117.333 199.164 117.333 208.000ZM213.333 208.000C213.333 216.836 206.170 224.000 197.333 224.000C188.497 224.000 181.333 216.836 181.333 208.000C181.333 199.164 188.497 192.000 197.333 192.000C206.170 192.000 213.333 199.164 213.333 208.000Z"
                        stroke="#000000"
                        strokeWidth={14}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        id="primary"
                      />
                      <path
                        d="M149.333 85.333V106.667M149.333 106.667V128.000M149.333 106.667H128.000M149.333 106.667H170.667"
                        stroke="url(#a)"
                        strokeWidth={14}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        id="secondary"
                      />
                    </g>
                  </svg>
                </span>
                Add to cart
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

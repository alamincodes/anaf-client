import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useCart } from "react-use-cart";
import { HiOutlineShoppingBag } from "react-icons/hi";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AnimatePage from "../Shared/AnimatePage";
const ProductDetail = () => {
  const [orderDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductDetail(data);
        setIsLoading(false);
      });
  }, []);
  //   if (isLoading) {
  //     return <LoadingSpinner />;
  //   }
  return (
    <AnimatePage>
      <div>
        <div className="overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative ">
                  <img
                    src={orderDetail.img}
                    className="w-full rounded-md relative z-10"
                    alt=""
                  />
                  <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5">
                    {orderDetail.name}
                  </h1>
                  <p className="text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing, elit.
                    Eos, voluptatum dolorum! Laborum blanditiis consequatur,
                    voluptates, sint enim fugiat saepe, dolor fugit, magnam
                    explicabo eaque quas id quo porro dolorum facilis...{" "}
                    <a
                      href="#"
                      className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
                    >
                      MORE <i className="mdi mdi-arrow-right"></i>
                    </a>
                  </p>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="inline-block align-bottom mr-5">
                    <h4 className="text-2xl font-bold">
                      Price: {orderDetail.price}TK
                    </h4>
                  </div>
                  <div className="inline-block align-bottom">
                    <button
                      onClick={() => addItem(orderDetail)}
                      className="flex items-center w-full justify-center bg-gray-900 p-2 md:p-3 text-white hover:border-2 hover:border-black hover:text-black  hover:bg-transparent transition-all border-2 border-transparent sm:bg-none font-medium md:text-sm text-[10px]"
                    >
                      <HiOutlineShoppingBag className="md:text-2xl text-xl mr-1 mb-1" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default ProductDetail;

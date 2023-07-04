import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useCart } from "react-use-cart";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiCheckCircle } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import "react-loading-skeleton/dist/skeleton.css";
import AnimatePage from "../Shared/AnimatePage";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();
  let { id } = useParams();

  const handleAddToCart = () => {
    addItem(productDetail);
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProductDetail(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <section>
        <div className="container mx-auto px-4 relative">
          {/* toast */}
          {isVisible && (
            <div className="my-4 rounded w-[300px] z-20 top-[50px] right-0 fixed text-green-700  bg-green-200 p-5 ">
              <div className="flex items-center">
                <span>
                  {" "}
                  <HiCheckCircle
                    size={20}
                    className="text-green-500 mr-1"
                  />{" "}
                </span>{" "}
                <p>Added Successfully, Go to cart.</p>
              </div>
            </div>
          )}
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg">
                    <img
                      className="h-full w-full max-w-full object-cover"
                      src={productDetail.img}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="md:text-2xl text-xl font-bold text-gray-900 ">
                {productDetail.name}
              </h1>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">
                    ৳ {productDetail.price}
                  </h1>{" "}
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={productDetail.outOfStock === "true"}
                  className="inline-flex disabled:bg-gray-400 items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                >
                  {productDetail.outOfStock === "true" ? (
                    "Out of stock"
                  ) : (
                    <>
                      <HiOutlineShoppingBag className="mr-1" size={20} />
                      Add to cart
                    </>
                  )}
                </button>
              </div>

              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <TbTruckDelivery size={20} className="mr-2" />
                  Home delivery
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <span className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                    {" "}
                    Description{" "}
                  </span>
                </nav>
              </div>

              <div className="mt-8 flow-root sm:mt-12">
                <p className="mt-0">{productDetail.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default ProductDetail;

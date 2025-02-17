import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useCart } from "react-use-cart";
import "react-loading-skeleton/dist/skeleton.css";
import AnimatePage from "../Shared/AnimatePage";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { BsCreditCard } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { HiCheckCircle, HiOutlineShoppingBag } from "react-icons/hi";
import RelatedPRoducts from "./RelatedProducts/RelatedPRoducts";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import {
  addCartWhite,
  cartIconWhite,
  showIcon,
} from "../Shared/icons/svgIcons";
const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImg, setActiveImg] = useState("");
  const { addItem } = useCart();
  const { img, name, detail, price, outOfStock } = productDetail;
  let { id } = useParams();
  const handleAddToCart = () => {
    addItem(productDetail);
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

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
        setActiveImg(data?.img?.[0]);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <section>
        <div className="myContainer mt-2 relative">
          {isVisible && (
            <div className="show rounded-sm  w-[300px] z-20 top-[80px] right-0 fixed text-white bg-black p-4">
              <div className="flex items-center">
                <h5 className="mr-1">{addCartWhite()}</h5>
                <p className="flex items-center">
                  Product added
                  <Link
                    to="/cart"
                    className="bg-orange-600 py-2 px-3 ml-3 rounded flex items-center"
                  >
                    <span className="mr-1"> {showIcon()} </span> View
                  </Link>
                </p>
              </div>
            </div>
          )}
          {/* product details */}
          <div className="flex flex-col md:gap-4 lg:flex-row bg-white shadow-cardShadow rounded-xl md:p-5 p-2">
            {/* left */}
            <div className="flex flex-col lg:w-[30%] ">
              <div className="">
                <img
                  src={activeImg}
                  className="md:w-[400px] lg:h-[400px] object-cover w-full h-full rounded"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="flex flex-wrap space-x-1">
                {img?.map((singleImg) => {
                  return (
                    <img
                      key={singleImg}
                      onClick={() => setActiveImg(singleImg)}
                      className="w-20 h-20 object-cover border p-1 mt-3 cursor-pointer"
                      src={singleImg}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
            {/* right */}
            <div className="md:p-3 md:mt-0 mt-5 md:w-[50%]">
              <div className="border-b">
                <h2 className="md:text-3xl text-lg font-medium mb-2">{name}</h2>
              </div>
              {/* price section */}
              <div className="flex md:flex-col flex-col-reverse">
                {/* list */}
                <div className="py-5 px-3">
                  <div className="flex items-center space-x-4 mt-2">
                    <span>
                      <FiCheckCircle size={25} />
                    </span>
                    <h2>Authentic product</h2>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span>
                      <TbTruckDelivery size={25} />
                    </span>
                    <h2>Home delivery</h2>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span>
                      <BsCreditCard size={25} />
                    </span>
                    <h2>Pay online or when receiving goods</h2>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span>
                      <TbTruckReturn size={25} />
                    </span>
                    <h2>7 days replacement warranty</h2>
                  </div>
                </div>
                {/* price and add to cart button */}
                <div className=" md:border-t md:border-b-0 border-b py-5 flex md:items-start items-center md:justify-start justify-between md:flex-col md:space-y-3">
                  <h2 className="text-2xl font-bold text-orange-500 flex items-center">
                    <span>
                      <HiCurrencyBangladeshi size={32} />
                    </span>{" "}
                    {price}
                  </h2>
                  <button
                    disabled={outOfStock === "true"}
                    onClick={handleAddToCart}
                    className="py-4 px-6 active:transition-[0.3s] active:scale-[0.93] disabled:bg-neutral-500 font-[500] flex items-center justify-center uppercase md:w-[200px] rounded bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    <span className="mb-1 mr-1">{cartIconWhite()}</span>
                    {outOfStock === "true" ? "Out of stock" : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="p-5 bg-white mt-3 overflow-x-auto shadow-cardShadow rounded-xl">
            <nav className="flex gap-4 border-b">
              <span className="border-b-2 border-gray-900 py-3 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                Description
              </span>
            </nav>
            <p className="mt-2">{detail}</p>
          </div>
          {/* related products */}
          <div>
            <RelatedPRoducts productDetail={productDetail} />
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default ProductDetail;

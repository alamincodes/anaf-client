import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useCart } from "react-use-cart";
import "react-loading-skeleton/dist/skeleton.css";
import AnimatePage from "../Shared/AnimatePage";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { BsCreditCard } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { HiCheckCircle, HiOutlineShoppingBag } from "react-icons/hi";
const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImg, setActiveImg] = useState("");
  const { addItem } = useCart();
  const { img, name, detail, price } = productDetail;
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
        setActiveImg(data?.img[0]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <section>
        <div className="md:container md:mx-auto md:px-0 relative px-2">
          {/* toast */}
          {isVisible && (
            <div className="my-4 rounded-sm w-[300px] z-20 top-[50px] right-0 fixed text-white bg-neutral-900 p-5">
              <div className="flex items-center">
                <span>
                  {" "}
                  <HiCheckCircle
                    size={23}
                    className="text-green-500 mr-1"
                  />{" "}
                </span>{" "}
                <p>Added Successfully, Go to cart.</p>
              </div>
            </div>
          )}
          <div className="flex flex-col md:gap-4 md:flex-row bg-white">
            {/* left */}
            <div className="flex flex-col md:w-[40%]">
              <div>
                <img
                  src={activeImg}
                  className="md:w-full md:h-[500px] object-cover"
                  alt=""
                />
              </div>
              <div className="flex flex-wrap space-x-1">
                {img?.map((singleImg) => {
                  return (
                    <img
                      key={singleImg}
                      onClick={() => setActiveImg(singleImg)}
                      className="w-20 h-20 object-cover border p-1 my-1 cursor-pointer"
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
                <h2 className="md:text-3xl text-lg font-medium">{name}</h2>
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
                {/* btn */}
                <div className="md:border-t md:border-b-0 border-b md:py-5 pb-10 flex flex-col space-y-4 mt-5">
                  <h2 className="text-3xl font-bold text-neutral-900">
                    ৳ {price}
                  </h2>
                  <button
                    onClick={handleAddToCart}
                    className="py-4 px-3 font-[500] inline-flex justify-center uppercase text-lg md:w-[200px] rounded-sm bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    <span>
                      <HiOutlineShoppingBag size={25} className="mr-1" />
                    </span>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="p-5 bg-white mt-3 overflow-x-auto">
            <nav className="flex gap-4 border-b">
              <span className="border-b-2 border-gray-900 py-3 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                Description
              </span>
            </nav>
            <p className="mt-2">{detail}</p>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default ProductDetail;

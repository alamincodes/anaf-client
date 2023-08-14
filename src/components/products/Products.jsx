import React, { useEffect, useState } from "react";
import Product from "./Product";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import SkeletonCard from "../Shared/SkeletonCard";

const Products = () => {
  useTitle("Shop");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(15);

  const handleLoadMore = () => {
    setLoadCount((prevCount) => prevCount + 12);
    // console.log(loadCount);
  };

  useEffect(() => {
    // setIsLoading(true);
    fetch("https://anaf-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data.reverse());
        setIsLoading(false);
      });
  }, []);

  return (
    <AnimatePage>
      <section className="my-20">
        <div className="myContainer">
          <h2 className="md:text-3xl text-2xl font-bold text-center mt-20 uppercase mb-10">
            Our Products
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2">
            {isLoading && <SkeletonCard cards={20} />}
            {/* products */}
            {products.slice(0, loadCount).map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-7">
            {products.length <= loadCount ? (
              ""
            ) : (
              <button
                onClick={handleLoadMore}
                className="bg-black rounded-full text-white py-2 px-4"
              >
                View More
              </button>
            )}
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import Product from "./Product";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import SkeletonCard from "../Shared/SkeletonCard";

const Products = () => {
  useTitle("Shop");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(10);

  const handleLoadMore = () => {
    setLoadCount((prevCount) => prevCount + 10);
    console.log(loadCount);
  };

  useEffect(() => {
    // setIsLoading(true);
    fetch("https://anaf-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
        setIsLoading(false);
      });
  }, [products]);

  return (
    <AnimatePage>
      <section className="my-20">
        <div className="container mx-auto">
          <h2 className="md:text-2xl text-2xl font-bold text-center mt-20 uppercase mb-10">
            Our Products
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
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
                Load More
              </button>
            )}
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Products;

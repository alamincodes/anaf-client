import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import SkeletonCard from "../Shared/SkeletonCard";
import { useQuery } from "@tanstack/react-query";



const Products = () => {
  useTitle("Shop");
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(15);

  const handleLoadMore = () => {
    setLoadCount((prevCount) => prevCount + 15);
    // console.log(loadCount);
  };


    const {
      data: products = [],
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await fetch(`https://anaf-server.vercel.app/products`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data?.reverse();
      },
    });
  // useEffect(() => {
  //   // setIsLoading(true);
  //   fetch("https://anaf-server.vercel.app/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setProducts(data.reverse());
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <AnimatePage>
      <section className="mb-5 mt-2">
        <div className="myContainer ">
          <div className="bg-white md:p-5 p-2 shadow-cardShadow rounded-xl">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2">
              {isLoading && <SkeletonCard cards={20} />}
              {/* products */}
              {products.slice(0, loadCount)?.map((product) => (
                <Product
                 
                  key={product._id}
                  product={product}
                />
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
        </div>
      </section>
    </AnimatePage>
  );
};

export default Products;

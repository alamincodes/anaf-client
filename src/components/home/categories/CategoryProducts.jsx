import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Product from "../../products/Product";

const CategoryProducts = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://anaf-server.vercel.app/product/category?category=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCategories(data.reverse());
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div
      className="myContainer rounded-xl bg-white shadow-cardShadow md:p-5 p-2 my-4"
    >
      <div className="uppercase text-2xl font-bold">
        {category === "powerBank" && <h2>Power Bank</h2>}
        {category === "headphones" && <h2>Headphones</h2>}
        {category === "smartWatches" && <h2>Smart Watches</h2>}
        {category === "rechargeableFan" && <h2>Rechargeable Fan</h2>}
        {category === "router" && <h2>router </h2>}
        {category === "tripod" && <h2>tripod</h2>}
        {category === "microphone" && <h2>microphone</h2>}
        {category === "mouse" && <h2>Mouse</h2>}
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 mt-4">
        {categories.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;

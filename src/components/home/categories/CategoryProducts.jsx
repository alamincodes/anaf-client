import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CategoryProductCard from "./CategoryProductCard";
import LoadingSpinner from "../../Shared/LoadingSpinner";
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
      className="md:container md:mx-auto md:px-0 px-2 text-3xl font-bold my-4
  "
    >
      <div className=" uppercase">
        {category === "powerBank" && <h2>Power Bank</h2>}
        {category === "headphones" && <h2>Headphones</h2>}
        {category === "smartWatches" && <h2>Smart Watches</h2>}
        {category === "rechargeableFan" && <h2>Rechargeable Fan</h2>}
        {category === "router" && <h2>router </h2>}
        {category === "tripod" && <h2>tripod</h2>}
        {category === "microphone" && <h2>microphone</h2>}
        {category === "mouse" && <h2>Mouse</h2>}
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 mt-4">
        {categories.map((category) => (
          <CategoryProductCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;

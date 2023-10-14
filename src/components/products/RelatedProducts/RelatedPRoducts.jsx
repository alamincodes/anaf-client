import React, { useEffect, useState } from "react";
import RelatedProduct from "./RelatedProduct";
import SkeletonCard from "../../Shared/SkeletonCard";

const RelatedPRoducts = ({ productDetail }) => {
  const [relatedProducts, setRelatedPRoducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:5000/product/category?category=${productDetail.category}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setRelatedPRoducts(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="my-5">
      <h2 className="text-3xl uppercase font-bold mb-2">related products</h2>
      <div className="myContainer bg-white md:p-5 p-2 shadow-cardShadow rounded-xl">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2">
          {isLoading && <SkeletonCard cards={5} />}
          {/* products */}
          {relatedProducts.map((product) => (
            <RelatedProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedPRoducts;

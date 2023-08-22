import React, { useState } from "react";

const RelatedPRoducts = () => {
  const [relatedProducts, setRelatedPRoducts] = useState([]);
  return (
    <div className="mt-5">
      <h2 className="text-3xl uppercase font-bold">related products</h2>
    </div>
  );
};

export default RelatedPRoducts;

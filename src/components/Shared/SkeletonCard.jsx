import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonCard = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, i) => (
      <div key={i} className="border-gray-100 shadow p-2">
        <div className="">
          <Skeleton height={190} />
        </div>
        <div className="hidden md:block">
          <Skeleton count={7} />
        </div>
        <div className="block md:hidden">
          <Skeleton count={5} />
        </div>
      </div>
    ));
};

export default SkeletonCard;

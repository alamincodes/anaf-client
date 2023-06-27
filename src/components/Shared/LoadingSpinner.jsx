import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

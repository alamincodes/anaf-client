import React from "react";
import Banner from "./Banner";
import HomeSlider from "./HomeSlider";
import Products from "../products/Products";

const Home = () => {
  return (
    <div>
      <Banner />
      <Products />
      {/* <HomeSlider /> */}
    </div>
  );
};

export default Home;

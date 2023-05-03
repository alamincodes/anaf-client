import React from "react";
import Banner from "./Banner";
import HomeSlider from "./HomeSlider";
import Products from "../products/Products";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";

const Home = () => {
  useTitle("Home");
  return (
    <AnimatePage>
      <div>
        <Banner />
        <Products />
        {/* <HomeSlider /> */}
      </div>
    </AnimatePage>
  );
};

export default Home;

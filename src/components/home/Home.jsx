import React from "react";
import Banner from "./Banner";
import HomeSlider from "./HomeSlider";
import Products from "../products/Products";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import BusinessAbout from "./BusinessAbout";
import CallNow from "./CallNow";
import Categories from "./categories/Categories";

const Home = () => {
  useTitle("Home");
  return (
    <AnimatePage>
      <div>
        {/* <Banner /> */}
        <HomeSlider />
        <Categories />
        <Products />
        <BusinessAbout />
        {/* <HomeDelivery /> */}
        <CallNow />
      </div>
    </AnimatePage>
  );
};

export default Home;

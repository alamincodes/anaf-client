import React from "react";
import HomeSlider from "./HomeSlider";
import Products from "../products/Products";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import BusinessAbout from "./BusinessAbout";
import CallNow from "./CallNow";
import Categories from "./categories/Categories";
import LiveChat from "../Shared/liveChat/LiveChat";

const Home = () => {
  useTitle("Home");
  return (
    <AnimatePage>
      <div>
        <LiveChat />
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

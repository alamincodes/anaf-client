import React from "react";
import Banner from "./Banner";
import HomeSlider from "./HomeSlider";
import Products from "../products/Products";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import HomeDelivery from "./HomeDelivery";
import Footer from "../Shared/Footer";
import BusinessAbout from "./BusinessAbout";
import CallNow from "./CallNow";

const Home = () => {
  useTitle("Home");
  return (
    <AnimatePage>
      <div className="">
        <Banner />
        <Products />
        {/* <HomeSlider /> */}
        <BusinessAbout />
        <HomeDelivery />
        <CallNow />
        <Footer />
      </div>
    </AnimatePage>
  );
};

export default Home;

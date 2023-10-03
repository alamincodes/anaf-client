import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import ScrollTop from "../Shared/ScrollTop";
import HeaderContact from "../Shared/HeaderContact";
import FooterSection from "../Shared/FooterSection";

const Main = () => {
  return (
    <div className="mt-[80px] flex flex-col min-h-screen md:mb-auto mb-[76px]">
      <ScrollTop />
      {/* <HeaderContact /> */}
      <Navbar />
      <Outlet />
      <FooterSection />
    </div>
  );
};

export default Main;

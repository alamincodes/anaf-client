import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import ScrollTop from "../Shared/ScrollTop";
import HeaderContact from "../Shared/HeaderContact";

const Main = () => {
  return (
    <div>
      <ScrollTop />
      <HeaderContact />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;

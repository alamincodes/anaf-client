import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import ScrollTop from "../Shared/ScrollTop";

const Main = () => {
  return (
    <div>
       <ScrollTop />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;

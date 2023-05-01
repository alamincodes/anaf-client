import React from "react";
import bannerImg from "../../assets/image/banner.png";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Banner = () => {
  return (
    <section>
      <div className="lg:container lg:mx-auto ">
        <div className="relative select-none">
          <img src={bannerImg} alt="" />

          <button className="absolute bg-[#1e1e20] group flex items-center justify-center hover:border-black hover:text-black  hover:bg-transparent transition-all border-2 border-transparent sm:bg-none font-medium md:p-4 p-2 md:text-sm text-[10px] md:w-[200px] w-32 text-white  md:bottom-12 md:right-8 bottom-0 right-1">
            Explore more{" "}
            <HiOutlineArrowNarrowRight className="text-xl ml-1 group-hover:translate-x-3 transition-all" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;

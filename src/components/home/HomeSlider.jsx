import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";

const HomeSlider = () => {
  return (
    <div className="lg:container lg:mx-auto ">
      <Swiper
        style={{
          "--swiper-navigation-color": "gray",
          "--swiper-pagination-color": "black",
        }}
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
      >
        <SwiperSlide>
          <div className="">
            <img
              className="w-full md:h-[500px] h-[200px] bg-cover bg-center object-cover"
              src="https://i.ibb.co/0hkHgt5/Special-Collection-Gadget-and-Electronic-Banner-2.png"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full md:h-[500px] h-[200px] bg-cover bg-center object-cover"
            src="https://i.ibb.co/cvp3kPQ/Special-Collection-Gadget-and-Electronic-Banner-1.png"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;

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
    <div className="lg:container lg:mx-auto h-screen">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#38bdf8",
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
              className="w-full relative lg:h-[500px] h-[200px] object-fill"
              src="https://i.ibb.co/0nBsSHL/Blue-Ecommerce-Online-Shopping-Linked-In-Banner.png"
            />
            <button className="absolute bottom-20 left-10 bg-black text-white py-3 px-6">
              Buy Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full lg:h-[500px] h-[200px] bg-cover bg-center object-cover"
            src="https://i.ibb.co/n1CGFCj/Untitled-design.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full lg:h-[500px] h-[200px] bg-cover bg-center object-cover"
            src="https://ps.w.org/woo-product-slider/assets/banner-772x250.png?rev=2646089"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full lg:h-[500px] h-[200px] bg-cover bg-center object-cover"
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;

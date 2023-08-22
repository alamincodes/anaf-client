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
    <div className="myContainer lg:flex lg:flex-row gap-5 mt-3">
      {/* <Swiper
        style={{
          "--swiper-navigation-color": "gray",
          "--swiper-pagination-color": "white",
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
          <img
            className="w-full md:h-[600px] h-[200px] bg-cover bg-center object-cover"
            src="https://i.ibb.co/WybXb8T/Special-Collection-Gadget-and-Electronic-Banner-transformed.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full md:h-[600px] h-[200px] bg-cover bg-center object-cover"
            src="https://i.ibb.co/54dz9tj/Black-Friday-Sale-Promotion-Banner-1.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="w-full md:h-[600px] h-[200px] bg-cover bg-center object-cover"
              src="https://i.ibb.co/bgD3c4R/1-transformed-1.png"
            />
          </div>
        </SwiperSlide>
      </Swiper> */}

      <Swiper
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide>
          <img
            className="rounded-xl max-h-[477px]"
            src="https://i.ibb.co/WybXb8T/Special-Collection-Gadget-and-Electronic-Banner-transformed.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-xl max-h-[477px]"
            src="https://i.ibb.co/54dz9tj/Black-Friday-Sale-Promotion-Banner-1.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-xl max-h-[477px]"
            src="https://i.ibb.co/bgD3c4R/1-transformed-1.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <div className="bg-[#F5F5F5] rounded-xl p-3 lg:max-w-[30%] lg:mt-0 mt-3">
        <p className="bg-white p-3 rounded-xl">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          laboriosam facere. Ipsam ab dolores at non velit officia quibusdam,
          illo ex. Accusamus dignissimos quis illum consequuntur fugiat
          aspernatur modi quae.{" "}
        </p>
        <p className="bg-white p-3 rounded-xl mt-3">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          laboriosam facere. Ipsam ab dolores at non velit officia quibusdam,
          illo ex. Accusamus dignissimos quis illum consequuntur fugiat
          aspernatur modi quae.{" "}
        </p>
      </div>
    </div>
  );
};

export default HomeSlider;

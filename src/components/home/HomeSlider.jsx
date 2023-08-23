import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import business1 from "../../assets/image/business1.jpg";
import business2 from "../../assets/image/business2.jpg";
const HomeSlider = () => {
  return (
    <div className="myContainer lg:flex lg:flex-row gap-5 mt-3">
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
        className="mySwiper rounded"
      >
        <SwiperSlide>
          <img
            className="rounded h-full"
            src="https://i.ibb.co/WybXb8T/Special-Collection-Gadget-and-Electronic-Banner-transformed.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded h-full"
            src="https://i.ibb.co/54dz9tj/Black-Friday-Sale-Promotion-Banner-1.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded h-full"
            src="https://i.ibb.co/bgD3c4R/1-transformed-1.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <div className="rounded bg-white shadow-cardShadow lg:max-w-[30%] lg:mt-0 mt-3 lg:p-5 p-2">
        <div className="flex lg:flex-col scrollbar-hide flex-row lg:h-[400px] overflow-y-auto lg:gap-y-3 gap-x-3">
          <div className="min-w-[248px]">
            <p className="bg-white h-full shadow-cardShadow p-3 rounded bg-gradient-to-tr from-fuchsia-400/20 to-sky-200/20">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, laboriosam facere. Ipsam ab dolores at non velit
              officia quibusdam,
            </p>
          </div>
          <div className="min-w-[248px]">
            <p className="bg-white h-full shadow-cardShadow p-3 rounded bg-gradient-to-tr from-fuchsia-400/20 to-sky-200/20">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, laboriosam facere. Ipsam ab dolores at non velit
              officia quibusdam,
            </p>
          </div>
          <div className="min-w-[248px]">
            <p className="bg-white h-full shadow-cardShadow p-3 rounded bg-gradient-to-tr from-fuchsia-400/20 to-sky-200/20">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, laboriosam facere. Ipsam ab dolores at non velit
              officia quibusdam,
            </p>
          </div>
          <div className="min-w-[248px]">
            <p className="bg-white h-full shadow-cardShadow p-3 rounded bg-gradient-to-tr from-fuchsia-400/20 to-sky-200/20">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, laboriosam facere. Ipsam ab dolores at non velit
              officia quibusdam,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

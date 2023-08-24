import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import CountdownClock from "../Shared/countdownClock/CountdownClock";
import { Link } from "react-router-dom";

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
        className="mySwiper lg:rounded-xl rounded-md"
      >
        <SwiperSlide>
          <img
            className="lg:rounded-xl rounded-md h-full"
            src="https://i.ibb.co/WybXb8T/Special-Collection-Gadget-and-Electronic-Banner-transformed.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="lg:rounded-xl rounded-md h-full"
            src="https://i.ibb.co/54dz9tj/Black-Friday-Sale-Promotion-Banner-1.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="lg:rounded-xl rounded-md h-full"
            src="https://i.ibb.co/bgD3c4R/1-transformed-1.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      {/* right side */}
      <div className="rounded-xl bg-gradient-to-b from-neutral-200 to-neutral-100 lg:max-w-[30%] lg:mt-0 mt-3 lg:p-5 p-2">
        <h2 className="uppercase font-bold text-xs my-1">Best offer🔥 </h2>
        <div className="flex lg:flex-col scrollbar-hide flex-row lg:h-[400px] overflow-y-auto lg:gap-y-3 gap-x-3">
          {/* card */}
          <Link to="http://anafshop.com/product/64d89ddb7a40b71495def6ff">
            <div className=" shadow-cardShadow p-3 rounded-lg min-w-[330px] bg-white">
              <div className="flex flex-row justify-between items-center">
                {/* left */}
                <div className="flex justify-center items-center">
                  <img
                    src="https://dropshop.com.bd/wp-content/uploads/2023/04/T800-Ultra-Smart-Watch-BD.jpg"
                    alt="t800"
                    className="max-w-[90px] min-w-[90px]"
                  />
                </div>
                <div className="w-full">
                  <h2 className="font-bold text-orange-500 uppercase text-xs">
                    T800 ultra Black
                  </h2>
                </div>
                {/* right */}
                <div className="w-full">
                  <CountdownClock
                    startDate="2023-08-24T16:32:00"
                    d={10}
                    h={0}
                    m={0}
                    s={0}
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link to="http://anafshop.com/product/64d89d9f7a40b71495def6fe">
            <div className="shadow-cardShadow p-3 rounded-lg min-w-[330px] bg-white">
              <div className="flex flex-row justify-between items-center">
                {/* left */}
                <div className="flex justify-center items-center">
                  <img
                    src="https://i.ibb.co/fn7CcpC/T800-Ultra-Smart-Watch-800x800.jpg"
                    alt="t800"
                    className="max-w-[90px] min-w-[103px]"
                  />
                </div>
                <div className="w-full">
                  <h2 className="font-bold text-orange-500 uppercase text-xs">
                    T800 ultra Orange
                  </h2>
                </div>
                {/* right */}
                <div className="w-full">
                  <CountdownClock
                    startDate="2023-08-24T17:50:00"
                    d={10}
                    h={0}
                    m={0}
                    s={0}
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link to="http://anafshop.com/product/64e58e71e55d35b9c4662de3">
            <div className=" shadow-cardShadow p-3 rounded-lg min-w-[330px] bg-white">
              <div className="flex flex-row justify-between items-center">
                {/* left */}
                <div className="flex justify-center items-center">
                  <img
                    src="https://i.ibb.co/Jx5D0XD/Smart-Watch-Belt-Black-Color.png"
                    alt="t800"
                    className="max-w-[90px] min-w-[103px]"
                  />
                </div>
                <div className="w-full">
                  <h2 className="font-bold uppercase text-xs text-orange-500">
                    Nylon Strap – Black Color
                  </h2>
                </div>
                {/* right */}
                <div className="w-full">
                  <CountdownClock
                    startDate="2023-08-24T17:50:00"
                    d={10}
                    h={0}
                    m={0}
                    s={0}
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link to="http://anafshop.com/product/64e58daae55d35b9c4662de0">
            <div className=" shadow-cardShadow p-3 rounded-lg min-w-[330px] bg-white">
              <div className="flex flex-row justify-between items-center">
                {/* left */}
                <div className="flex justify-center items-center">
                  <img
                    src="https://i.ibb.co/djdN8WQ/Smart-Watch-Belt-Navy-Blue-Color.png"
                    alt="t800"
                    className="max-w-[90px] min-w-[103px]"
                  />
                </div>
                <div className="w-full">
                  <h2 className="font-bold uppercase text-xs text-orange-500">
                    Nylon Strap – green Color
                  </h2>
                </div>
                {/* right */}
                <div className="w-full">
                  <CountdownClock
                    startDate="2023-08-24T17:50:00"
                    d={10}
                    h={0}
                    m={0}
                    s={0}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

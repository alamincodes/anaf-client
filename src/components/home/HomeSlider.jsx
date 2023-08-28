import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import BestOffer from "./offer/BestOffer";

const HomeSlider = () => {
  
  return (
    <div className="myContainer mt-2">
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-5">
        <div className="lg:col-span-8 lg:max-h-full max-h-[400px]">
          <Splide
            options={{
              rewind: true,
              autoplay: true,
              interval: 3000,
              type: "fade",
              arrows: false,
            }}
            aria-label="React Splide Example"
          >
            <SplideSlide>
              <img
                className="lg:rounded-xl rounded-md lg:max-h-full max-h-[400px]"
                src="https://i.ibb.co/Qmt7ZHP/Website-Banner-2-transformed.png"
                alt=""
              />
            </SplideSlide>
            <SplideSlide>
              <img
                className="lg:rounded-xl rounded-md lg:max-h-full max-h-[400px]"
                src="https://i.ibb.co/Q6mkrg8/Gadget-3-transformed.jpg"
                alt=""
              />
            </SplideSlide>

            <SplideSlide>
              <img
                className="lg:rounded-xl rounded-md lg:max-h-full max-h-[400px]"
                src="https://i.ibb.co/0fHX3T9/Website-Banner-1-transformed.png"
                alt=""
              />
            </SplideSlide>
          </Splide>
        </div>
        {/* right side */}
        <div className="lg:col-span-4">
          <BestOffer />
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

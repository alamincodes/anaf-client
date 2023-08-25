import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import BestOffer from "./offer/BestOffer";

const HomeSlider = () => {
  return (
    <div className="myContainer mt-3">
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
                src="https://i.ibb.co/WybXb8T/Special-Collection-Gadget-and-Electronic-Banner-transformed.png"
                alt=""
              />
            </SplideSlide>
            <SplideSlide>
              <img
                className="lg:rounded-xl rounded-md lg:max-h-full max-h-[400px]"
                src="https://i.ibb.co/54dz9tj/Black-Friday-Sale-Promotion-Banner-1.png"
                alt=""
              />
            </SplideSlide>
            <SplideSlide>
              <img
                className="lg:rounded-xl rounded-md lg:max-h-full max-h-[400px]"
                src="https://i.ibb.co/bgD3c4R/1-transformed-1.png"
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

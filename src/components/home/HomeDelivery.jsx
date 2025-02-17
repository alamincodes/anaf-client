import React from "react";
import delivery from "../../assets/image/delivery.svg";
const HomeDelivery = () => {
  return (
    <section className="my-20">
      <div className="container mx-auto py-14 ">
        <div className="flex items-center justify-evenly p-6 bg-gray-200 md:flex-row flex-col-reverse">
          <div className="max-w-[600px]">
            <h2 className="text-black lg:text-6xl md:text-4xl text-2xl md:text-left text-center font-extrabold uppercase">
              home delivery in{" "}
              <span className="text-green-500">Bangladesh</span> within{" "}
              <span className="text-orange-500">3 days.</span>
            </h2>
          </div>
          <div>
            <img
              src={delivery}
              className="md:w-[400px] w-[400px] md:h-[400px] h-[200px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDelivery;

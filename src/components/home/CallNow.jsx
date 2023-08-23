import React from "react";
import { TbPhoneCall } from "react-icons/tb";
const CallNow = () => {
  return (
    <section className="myContainer my-4">
      <div className="flex md:flex-row flex-col justify-between items-center md:text-left text-center md:p-10 p-3 bg-neutral-900 text-gray-100 rounded-xl">
        <div>
          <h2 className="lg:text-3xl text-lg font-bold font-secondary">
            অর্ডার সম্পকির্ত যেকোনো তথ্যের জন্য কল করুন
          </h2>
          <p className="font-secondary text-gray-200">
            সকাল ৯ টা থেকে রাত ১০ টা পর্যন্ত
          </p>
          <p className="font-secondary text-gray-200">01630328733</p>
        </div>
        <div className="my-5 group">
          <a
            href="tel:+8801630328733"
            className="font-secondary flex items-center bg-white py-2 px-6 rounded-md text-black font-bold text-lg"
          >
            <span>
              <TbPhoneCall
                size={20}
                className="mr-1 group-hover:animate-pulse"
              />
            </span>{" "}
            কল করুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallNow;

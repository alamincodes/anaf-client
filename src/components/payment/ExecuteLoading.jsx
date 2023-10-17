import React from "react";
import bkashLoadingJson from "./animationJson/bkashLoading.json";
import { useLottie } from "lottie-react";
const ExecuteLoading = () => {
  const option = {
    animationData: bkashLoadingJson,
    loop: true,
  };

  const { View } = useLottie(option);
  return (
    <div className="grid place-content-center h-[600px] ">
      <div className="flex justify-center items-center flex-col px-5 ">
        <h3 className="w-[200px]">{View}</h3>
        <h3 className="font-secondary font-semibold text-orange-500 text-center">
          আপনার পেমেন্ট রিকুয়েস্ট টি প্রসেসিং হচ্ছে, অপেক্ষা করুন.....
        </h3>
      </div>
    </div>
  );
};

export default ExecuteLoading;

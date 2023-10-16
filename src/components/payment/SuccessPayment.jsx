import { useLottie } from "lottie-react";
import React from "react";
import SuccessAnimationIcon from "./animationJson/success.json";
const SuccessPayment = ({ successPaymentData }) => {
  // animation
  const successAnimation = {
    animationData: SuccessAnimationIcon,
    loop: false,
  };

  const { View } = useLottie(successAnimation);
  return (
    <div>
      {successPaymentData.status === "FAILED" ? (
        <h3 className="text-red-500 text-center font-bold md:text-5xl text-2xl md:mt-20 mt-10 uppercase">
          {successPaymentData.paymentData?.statusMessage}
        </h3>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h4 className="md:w-[300px] w-56 h-36">{View}</h4>
          <h3 className="text-green-800 font-bold md:text-5xl text-2xl md:mt-20 mt-10 uppercase">
            {successPaymentData.message}
          </h3>
          {/* order detail */}
          <div></div>
        </div>
      )}
    </div>
  );
};

export default SuccessPayment;

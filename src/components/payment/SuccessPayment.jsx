import { useLottie } from "lottie-react";
import SuccessAnimationIcon from "./animationJson/success.json";
import { Link } from "react-router-dom";

const SuccessPayment = ({ successPaymentData }) => {
  // animation
  const successAnimation = {
    animationData: SuccessAnimationIcon,
    loop: false,
  };

  const { View } = useLottie(successAnimation);

  return (
    <section>
      <div className="flex justify-center items-center shadow-cardShadow h-[500px] flex-col bg-white lg:mx-[200px] my-6 rounded-md">
        <h4 className="md:w-[250px] w-56 h-36 ">{View}</h4>
        <h3 className="text-green-800 font-bold md:text-2xl text-2xl md:mt-20 mb-3 mt-10 uppercase">
          {successPaymentData.message}
        </h3>
        {/* order detail */}
        <div className="border-2 bg-white border-dashed p-4 md:w-[400px] md:h-[250px] w-full relative mb-5">
          <ul className="font-bold uppercase flex justify-center flex-col items-center">
            <li className="border-b-2 border-orange-500 w-full border-dashed">
              <span className="text-orange-500">Amount: </span>
              {successPaymentData.paymentData?.amount} TK
            </li>
            <li className="border-b-2 border-orange-500 w-full border-dashed mt-2">
              <span className="text-orange-500">Transaction ID: </span>
              {successPaymentData.paymentData?.trxID}
            </li>
            <div className="bg-orange-50 text-black p-2 font-secondary border-2 border-orange-500 border-dashed mt-5">
              <p>
                আপনার অর্ডারটি রিসিভ হয়েছে, কিছুক্ষনের মধ্যে আমাদের প্রতিনিধি
                আপনার সাথে যোগাযোগ করবেন।
              </p>
              <p>ধন্যবাদ।</p>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <div className="flex justify-center w-full bg-neutral-200 uppercase text-xs text-black px-4 py-2 rounded mt-2">
                <Link to="/orders">Home</Link>
              </div>
              <div className="flex justify-center w-full bg-orange-500 uppercase text-xs text-white px-4 py-2 rounded mt-2">
                <Link to="/orders">See order</Link>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SuccessPayment;

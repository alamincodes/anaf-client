import { useLottie } from "lottie-react";
import SuccessAnimationIcon from "./animationJson/success.json";
import { Link } from "react-router-dom";
const SuccessPayment = ({ successPaymentData }) => {
  // animation
  const successAnimation = {
    animationData: SuccessAnimationIcon,
    loop: true,
  };

  const { View } = useLottie(successAnimation);

  return (
    <div>
      {successPaymentData.status === "FAILED" ? (
        <div className="text-center  uppercase bg-white p-5 py-20">
          <h3 className="text-red-500 font-bold md:text-5xl text-2xl ">
            {successPaymentData.paymentData?.statusMessage}
          </h3>
          {successPaymentData.paymentData?.statusCode === "2023" && (
            <p className="text-black font-secondary text-lg">
              আপনার একাউন্টে পর্যাপ্ত পরিমান ব্যালেন্স নেই।
            </p>
          )}
          <Link to="/cart">
            <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
              Try again
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h4 className="md:w-[300px] w-56 h-32 ">{View}</h4>
          <h3 className="text-green-800 font-bold md:text-2xl text-2xl md:mt-20 mb-3 mt-10 uppercase">
            {successPaymentData.message}
          </h3>
          {/* order detail */}
          <div className="border-2 bg-white border-dashed p-3 md:w-[400px] md:h-[250px] w-full relative">
            <ul className="font-bold uppercase flex justify-center flex-col items-center">
              <li className="border-b-2 border-orange-500 w-full border-dashed">
                {" "}
                <span className="text-orange-500">Amount: </span>
                {successPaymentData.paymentData?.amount} TK
              </li>
              <li className="border-b-2 border-orange-500 w-full border-dashed mt-2">
                {" "}
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
              <div className="flex justify-end w-full">
                <Link to="/orders">
                  <button className="bg-orange-500 uppercase text-xs text-white px-4 py-2 rounded-sm mt-3">
                    See oreder
                  </button>
                </Link>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPayment;

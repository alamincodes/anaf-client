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
    <div>
      {successPaymentData.status === "FAILED" ? (
        <div className="text-center md:mt-20 mt-10 uppercase">
          <h3 className="text-red-500 font-bold md:text-5xl text-2xl ">
            {successPaymentData.paymentData?.statusMessage}
          </h3>
          <Link to="/cart">
            <button className="bg-neutral-800 text-white px-6 py-2 rounded mt-3">
              Please try again
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h4 className="md:w-[300px] w-56 h-32">{View}</h4>
          <h3 className="text-green-800 font-bold md:text-2xl text-2xl md:mt-20 mb-3 mt-10 uppercase">
            {successPaymentData.message}
          </h3>
          {/* order detail */}
          <div className="border-2 bg-orange-50 border-dashed p-3 md:w-[400px] md:h-[200px] w-full relative">
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
              <div className="bg-orange-500 text-white p-2 font-secondary border-b-2 border-dashed">
                <p>
                  আপনার অর্ডারটি রিসিভ হয়েছে, কিছুক্ষনের মধ্যে আমাদের প্রতিনিধি
                  আপনার সাথে যোগাযোগ করবেন।
                </p>
              </div>
              <div className="flex justify-end w-full mt-2">
                <Link to="/orders">
                  <button className="bg-orange-500 uppercase text-xs text-white px-4 py-2 rounded">
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

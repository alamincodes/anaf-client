import React from "react";
import logo from "../../assets/logo/anaf-white.svg";
import { BiSupport } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { Link } from "react-router-dom";
import bkashPayment from "../../assets/logo/bkash_payment.png";
const FooterSection = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ANAF SHOP",
          text: "Hello, I am pleased to invite you to register using this link:",
          url: "https://anafshop.com/",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Sharing not supported on this browser.");
    }
  };
  return (
    <div className="mt-auto print:hidden bg-neutral-900 text-white">
      <footer className="myContainer">
        <div>
          {/* logo */}
          <div>
            <img src={logo} className="w-20 h-20" alt="" />
          </div>

          {/* details and social media */}
          <div className="flex md:flex-row flex-col-reverse  gap-y-4 justify-between items-center border-t border-neutral-800 py-5">
            {/* detail */}
            <div className="font-secondary ">
              <ul className="flex flex-wrap items-center justify-center space-x-4">
                <li>
                  <Link>
                    <button>পেমেন্ট করুন</button>
                  </Link>
                </li>
                <li>
                  <Link>
                    <button>ফেসবুক গ্রুপ</button>
                  </Link>
                </li>
                <li>
                  <Link>
                    <button>যোগাযোগ</button>
                  </Link>
                </li>
                <li>
                  <Link to='/refund-policy'>
                    <button>রিফান্ড পলিসি</button>
                  </Link>
                </li>
                <li>
                  <Link>
                    <button>প্রাইভেসি পলিসি</button>
                  </Link>
                </li>
              </ul>
            </div>
            {/* social */}
            <div className="flex items-center space-x-4">
              <h5
                onClick={handleShare}
                className="text-white bg-neutral-600 flex items-center justify-center p-2 rounded-full"
              >
                <button>
                  {" "}
                  <HiOutlineShare size={20} />{" "}
                </button>
              </h5>
              <Link
                to="/contact"
                className="text-white bg-neutral-600 flex items-center justify-center p-2 rounded-full"
              >
                <button>
                  {" "}
                  <BiSupport size={20} />{" "}
                </button>
              </Link>

              <a
                target="_blank"
                href="https://www.facebook.com/anaafshop"
                className="text-white bg-neutral-600 flex items-center justify-center p-2 rounded-full"
              >
                <button>
                  {" "}
                  <FaFacebook size={20} />{" "}
                </button>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/anaafshop"
                className="text-white bg-neutral-600 flex items-center justify-center p-2 rounded-full"
              >
                <button>
                  {" "}
                  <FaInstagram size={20} />{" "}
                </button>
              </a>
            </div>
          </div>
          {/* payment */}
          <div className="flex items-center space-x-10 border-t border-neutral-800 border-b">
            <h5 className="text-orange-500">Pay with</h5>
            <div className="border-l border-neutral-800 pl-10 py-5">
              <img src={bkashPayment} alt="bkashPayment" className="w-32 " />
            </div>
          </div>
          <p className="text-white text-center text-xs py-5">
            {`© Copyright ${new Date().getFullYear()} ANAF - All rights reserved.`}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;

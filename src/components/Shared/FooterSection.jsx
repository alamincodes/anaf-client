import React from "react";
import logo from "../../assets/logo/anaf-white.svg";
import { BiSupport } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { Link } from "react-router-dom";
import bkashPayment from "../../assets/logo/bkash_payment.svg";
const FooterSection = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ANAF SHOP",
          text: "Hello, I am pleased to invite you to register using this link:",
          url: "https://anaf-4fb1c.web.app/",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Sharing not supported on this browser.");
    }
  };
  return (
    <div className="mt-auto text-white print:hidden bg-neutral-900">
      <footer className="myContainer">
        <div>
          {/* logo */}
          <div>
            <img src={logo} className="w-20 h-20" alt="" />
          </div>

          {/* details and social media */}
          <div className="flex flex-col-reverse items-center justify-between py-5 border-t md:flex-row gap-y-4 border-neutral-800">
            {/* detail */}
            <div className="font-secondary ">
              <ul className="flex flex-wrap items-center justify-center space-x-4">
                <li className="duration-200 hover:text-orange-500">
                  <Link>
                    <button>পেমেন্ট করুন</button>
                  </Link>
                </li>
                <li className="duration-200 hover:text-orange-500">
                  <Link>
                    <button>ফেসবুক গ্রুপ</button>
                  </Link>
                </li>
                <li className="duration-200 hover:text-orange-500">
                  <Link to="contact">
                    <button>যোগাযোগ</button>
                  </Link>
                </li>
                <li className="duration-200 hover:text-orange-500">
                  <Link to="/refund-policy">
                    <button>রিফান্ড পলিসি</button>
                  </Link>
                </li>
                <li>
                  <Link className="duration-200 hover:text-orange-500">
                    <button>প্রাইভেসি পলিসি</button>
                  </Link>
                </li>
              </ul>
            </div>
            {/* social */}
            <div className="flex items-center space-x-4">
              <h5
                onClick={handleShare}
                className="flex items-center justify-center p-2 text-white rounded-full bg-neutral-600"
              >
                <button>
                  {" "}
                  <HiOutlineShare size={20} />{" "}
                </button>
              </h5>
              <Link
                to="/contact"
                className="flex items-center justify-center p-2 text-white rounded-full bg-neutral-600"
              >
                <button>
                  {" "}
                  <BiSupport size={20} />{" "}
                </button>
              </Link>

              <a
                target="_blank"
                href="https://www.facebook.com/anaafshop"
                className="flex items-center justify-center p-2 text-white rounded-full bg-neutral-600"
              >
                <button>
                  {" "}
                  <FaFacebook size={20} />{" "}
                </button>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/anaafshop"
                className="flex items-center justify-center p-2 text-white rounded-full bg-neutral-600"
              >
                <button>
                  {" "}
                  <FaInstagram size={20} />{" "}
                </button>
              </a>
            </div>
          </div>
          {/* payment */}
          <div className="flex items-center space-x-10 border-t border-b border-neutral-800">
            <h5 className="text-orange-500">Pay with</h5>
            <div className="py-5 pl-10 border-l border-neutral-800">
              <img
                src={bkashPayment}
                alt="bkashPayment"
                className="w-24 h-full p-2 bg-white rounded-lg"
              />
            </div>
          </div>
          <p className="py-5 text-xs text-center text-white">
            {`© Copyright ${new Date().getFullYear()} ANAF - All rights reserved.`}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;

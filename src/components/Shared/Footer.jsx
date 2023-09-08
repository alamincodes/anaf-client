import React from "react";
import logo from "../../assets/logo/anaf-white.svg";
import { BiSupport } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
const Footer = () => {
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
    <div className="mt-auto print:hidden">
      <footer>
        <div className="bg-neutral-800">
          <nav>
            <div className="flex justify-between myContainer items-center px-3 ">
              <img src={logo} className="w-20 h-20" alt="" />
              <p className="text-white md:block hidden text-center">
                © Copyright 2023 ANAF - All rights reserved.
              </p>

              <div className="flex space-x-3 items-center">
                <h5
                  onClick={handleShare}
                  className="text-white bg-neutral-600 flex items-center justify-center p-2 rounded-full"
                >
                  <button>
                    {" "}
                    <HiOutlineShare size={20} />{" "}
                  </button>
                </h5>
                <a
                  href="/contact"
                  className="text-white bg-neutral-600 flex items-center justify-center p-2 rounded-full"
                >
                  <button>
                    {" "}
                    <BiSupport size={20} />{" "}
                  </button>
                </a>
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
          </nav>
          <p className="text-white md:hidden text-center text-xs py-5">
            © Copyright 2023 ANAF - All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

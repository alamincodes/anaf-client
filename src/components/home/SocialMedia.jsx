import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import anaf from "../../assets/logo/anaf.svg";
const SocialMedia = () => {
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
    <section>
      <div className="myContainer grid md:grid-cols-3 grid-cols-1 gap-5">
        {/* card */}
        <div className="bg-[#2f55a4] text-white overflow-hidden py-8 px-5 rounded-lg relative">
          <span className="absolute -bottom-3 right-3 rotate-12 opacity-50">
            <FaFacebook size={100} />
          </span>
          <h2 className="text-2xl">Follow our facebook page.</h2>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.facebook.com/anaafshop/"
          >
            <button className="mt-10 inline-flex items-center bg-white text-black font-bold py-2 px-4 rounded">
              <span>
                <FaFacebook size={20} className="mr-1" />
              </span>{" "}
              Follow us
            </button>
          </a>
        </div>
        <div className="bg-[#C13584] text-white overflow-hidden py-8 px-5 rounded-lg relative">
          <span className="absolute -bottom-3 right-3 rotate-12 opacity-50">
            <FaInstagram size={100} />
          </span>
          <h2 className="text-2xl">Follow our instagram.</h2>

          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.instagram.com/anaafshop/"
          >
            <button className="mt-10 inline-flex items-center bg-white text-black font-bold py-2 px-4 rounded">
              <span>
                <FaInstagram size={20} className="mr-1" />
              </span>{" "}
              Follow us
            </button>
          </a>
        </div>
        <div className="bg-white text-black overflow-hidden py-8 px-5 rounded-lg relative">
          <span className="absolute -bottom-3 right-3 rotate-12 ">
            <img src={anaf} className="w-36" alt="anaf shop" />
          </span>
          <h2 className="text-2xl">You may now share our website.</h2>
          <button
            onClick={handleShare}
            className="mt-10 inline-flex items-center bg-black text-white font-bold py-2 px-4 rounded"
          >
            <span>
              <HiOutlineShare size={20} className="mr-1" />
            </span>{" "}
            Share
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;

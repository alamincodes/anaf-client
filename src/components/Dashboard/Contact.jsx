import React from "react";
import contact from "../../assets/image/contact.svg";
import { HiMail } from "react-icons/hi";
import { FiPhoneForwarded } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb";
import { MdOutlineMyLocation } from "react-icons/md";
import AnimatePage from "../Shared/AnimatePage";
const Contact = () => {
  return (
    <AnimatePage>
      <section className="myContainer bg-white p-5 overflow-hidden relative z-10">
        <div className="flex justify-evenly lg:flex-row flex-col">
          {/* left */}
          <div>
            <h4 className="text-3xl font-bold font-secondary">
              আমাদের সাথে <span className="text-orange-500">যোগাযোগ</span> করুন
            </h4>
            <p className=" font-secondary">
              আমাদের সাথে সরাসরি যোগাযোগ করতে নিচের যেকোন মাধ্যম ব্যবহার করতে
              পারেন।
            </p>
            <div className="flex flex-col space-y-5 mt-3">
              {/* email */}
              <div className="shadow-cardShadow rounded border relative overflow-hidden p-5 lg:w-96">
                <h3 className="text-xl my-4 font-medium font-primary flex items-center">
                  <span>
                    <HiMail className="mr-1" size={20} />
                  </span>{" "}
                  anafshop.com@gmail.com
                </h3>
                <a
                  href="mailto:anafshop.com@gmail.com"
                  className="p-2  rounded bg-neutral-800 flex items-center justify-center text-white"
                >
                  <span>
                    <HiMail className="mr-1" size={20} />
                  </span>
                  Send email
                </a>
              </div>
              {/* phone */}
              <div className="shadow-cardShadow rounded border relative overflow-hidden p-5 lg:w-96">
                <h3 className="text-xl font-primary my-4 font-medium flex items-center">
                  <span>
                    <span>
                      <TbPhoneCall className="mr-1" size={20} />
                    </span>
                  </span>
                  01630328733
                </h3>
                <a
                  href="tel:01630328733"
                  className="p-2 rounded bg-neutral-800 flex items-center justify-center text-white"
                >
                  <span>
                    <TbPhoneCall className="mr-1" size={20} />
                  </span>
                  Call Now
                </a>
              </div>
              {/* location */}
              <div className="shadow-cardShadow rounded border relative overflow-hidden p-5 lg:w-96">
                <h3 className="text-xl my-4 font-medium font-secondary flex items-center">
                  <span>
                    <MdOutlineMyLocation className="mr-1" size={20} />
                  </span>
                  কুমিল্লা, বাংলাদেশ
                </h3>
                <p className="font-secondary">
                  যোগাযোগের সময় - সকাল 10 টা থেকে রাত 10 টা.
                </p>
              </div>
            </div>
          </div>
          {/* right */}
          <div>
            <img
              src={contact}
              className="lg:w-[500px] lg:h-[500px]"
              alt="contact"
            />
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Contact;

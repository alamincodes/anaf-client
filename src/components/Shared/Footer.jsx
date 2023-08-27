import React from "react";
import logo from "../../assets/logo/anaf-white.svg";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import SocialMedia from "../home/SocialMedia";
const Footer = () => {
  return (
    <div className="mt-auto">
      <footer>
        <div>
          <nav className="bg-neutral-800">
            <div className="flex justify-between myContainer items-center px-3 ">
              <img src={logo} className="w-20 h-20" alt="" />
              <p className="text-white md:block hidden text-center">
                © Copyright 2023 ANAF - All rights reserved.
              </p>

              <div>
                <a href="/contact" className="text-white">
                  <button>
                    {" "}
                    <BiSupport size={20} />{" "}
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

import React from "react";
import logo from "../../assets/logo/anaf-white.svg";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import SocialMedia from "../home/SocialMedia";
const Footer = () => {
  return (
    <div className="mt-20 bg-neutral-900 ">
      <footer aria-label="Site Footer" className="container mx-auto">
        <div className="py-5">
          <SocialMedia />
        </div>
        <div>
          <nav className="flex justify-between items-center px-3">
            <img src={logo} className="w-20 h-20" alt="" />
            <p className="text-white md:block hidden text-center">
              © Copyright 2023 ANAF - All rights reserved.
            </p>
            <ul className="flex items-center justify-center space-x-5">
              <li>
                <Link
                  to="/contact"
                  className="text-white transition hover:opacity-80"
                >
                  <span>
                    {" "}
                    <BiSupport size={20} />
                  </span>
                </Link>
              </li>
            </ul>
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

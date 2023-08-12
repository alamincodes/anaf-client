import React from "react";
import logo from "../../assets/logo/anaf-white.svg";
import { RiHeadphoneLine, RiFacebookCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="mt-52 bg-neutral-900 ">
      <footer aria-label="Site Footer" className="container mx-auto">
        <div>
          <nav className="flex justify-between items-center px-3">
            <img src={logo} className="w-20 h-20" alt="" />
            <p className="text-white md:block hidden text-center">
              © Copyright 2023 ANAF - All rights reserved.
            </p>
            <ul className="flex items-center justify-center space-x-5">
              <li>
                <a
                  href="https://www.facebook.com/anaafshop"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-80"
                >
                  <RiFacebookCircleFill size={20} />
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white transition hover:opacity-80"
                >
                  <span>
                    {" "}
                    <RiHeadphoneLine size={20} />
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

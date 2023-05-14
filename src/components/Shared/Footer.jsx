import React from "react";
import logo from "../../assets/logo/anaf-white.svg";
const Footer = () => {
  return (
    <div className="mt-52">
      <footer aria-label="Site Footer" className="bg-black">
        <div>
          <div className="flex justify-center text-red-600">
            <img src={logo} className="w-28 h-28" alt="" />
          </div>

          <nav aria-label="Footer Nav" className="mt-5">
            <ul className="flex flex-wrap justify-center gap-6 ">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                 Contact
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Services
                </a>
              </li>
            </ul>
          </nav>

          <ul className="mt-2 flex justify-center ">
            <li>
              <a
                href="https://www.facebook.com/ANAF-Fashion-107170545685848"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-200"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <p className="text-white text-center text-xs mt-5 py-2">
            © Copyright 2023 ANAF - All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

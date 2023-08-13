import React, { useContext } from "react";
import img1 from "../../assets/image/business1.jpg";
import img2 from "../../assets/image/business2.jpg";
import { Link } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
const BusinessAbout = () => {
  const { user } = useContext(AUTH_CONTEXT);
  return (
    <section>
      <div className="myContainer">
        <h2 className="md:text-3xl text-2xl font-bold text-center mt-20 mb-10 uppercase">
          Business About
        </h2>
        <div className="">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-neutral-900 p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl uppercase font-bold text-white md:text-4xl">
                  our business type
                </h2>

                <p className="text-white/90 text-xs md:text-lg mt-4 ">
                  In the fast-paced world of business, staying ahead requires
                  leveraging the power of technology. ANAF is your trusted
                  partner, dedicated to providing innovative and high-quality
                  tech gadgets that empower businesses to thrive in today's
                  competitive landscape.
                </p>

                {!user && (
                  <div className="mt-4 md:mt-8">
                    <Link
                      to="/signUp"
                      className="inline-block rounded border transition-all duration-300 hover:border-white hover:bg-transparent bg-white hover:text-white px-12 py-3 text-sm font-medium text-black"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <div className="overflow-hidden group">
                <img
                  alt="clothing"
                  src={img1}
                  className="h-40 w-full object-cover sm:h-56 md:h-full group-hover:scale-110 duration-300"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  alt="clothing"
                  src={img2}
                  className="h-40 w-full object-cover sm:h-56 md:h-full group-hover:scale-110 duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessAbout;

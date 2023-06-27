import React, { useContext } from "react";
import img1 from "../../assets/image/business1.jpg";
import img2 from "../../assets/image/business2.jpg";
import { Link } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
const BusinessAbout = () => {
  const { user } = useContext(AUTH_CONTEXT);
  return (
    <section>
      <div className="container mx-auto">
        <h2 className="md:text-3xl text-2xl font-bold text-center mt-20 mb-20">
          Business About
        </h2>
        <div className="">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-black p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-white md:text-4xl uppercase">
                  our business type
                </h2>

                <p className="text-white/90 text-xs md:text-lg mt-4 ">
                  Our business operates within a precise seasonal framework,
                  carefully curating clothing collections that align with each
                  season. We prioritize precision and attention to detail,
                  integrating our offerings with climate and fashion trends.
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
              <img
                alt="clothing"
                src={img1}
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />

              <img
                alt="clothing"
                src={img2}
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessAbout;

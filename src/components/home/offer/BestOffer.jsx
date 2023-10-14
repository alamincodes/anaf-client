import React from "react";
import { Link } from "react-router-dom";
import CountdownClock from "../../Shared/countdownClock/CountdownClock";

const BestOffer = () => {
  return (
    <div className=" rounded-xl bg-gradient-to-b bg-white shadow-cardShadow lg:mt-0 mt-3 lg:p-5 p-2">
      <h2 className="uppercase font-bold md:text-lg text-xs my-1">Best offer🔥</h2>
      <div className="flex lg:flex-col scrollbar-hide flex-row lg:max-h-[349px] overflow-y-auto lg:gap-y-3 gap-x-3">
        {/* card */}
        <Link to="http://anafshop.com/product/64d89ddb7a40b71495def6ff">
          <div className=" shadow-cardShadow p-3 rounded-lg min-w-[330px] border">
            <div className="flex flex-row justify-between items-center">
              {/* left */}
              <div className="flex justify-center items-center">
                <img
                  src="https://dropshop.com.bd/wp-content/uploads/2023/04/T800-Ultra-Smart-Watch-BD.jpg"
                  alt="t800"
                  className="max-w-[90px] "
                />
              </div>
              <div className="w-full">
                <h2 className="font-bold text-neutral-700 uppercase text-xs">
                  T800 ultra Black
                </h2>
              </div>
              {/* right */}
              <div className="w-full">
                <CountdownClock
                  startDate="2023-10-29T12:00:00"
                  d={10}
                  h={0}
                  m={0}
                  s={0}
                />
              </div>
            </div>
          </div>
        </Link>

        {/* card */}
        <Link to="http://anafshop.com/product/64d89d9f7a40b71495def6fe">
          <div className="shadow-cardShadow p-3 rounded-lg min-w-[330px] border">
            <div className="flex flex-row justify-between items-center">
              {/* left */}
              <div className="flex justify-center items-center">
                <img
                  src="https://i.ibb.co/fn7CcpC/T800-Ultra-Smart-Watch-800x800.jpg"
                  alt="t800"
                  className="max-w-[90px] min-w-[103px]"
                />
              </div>
              <div className="w-full">
                <h2 className="font-bold text-neutral-700 uppercase text-xs">
                  T800 ultra Orange
                </h2>
              </div>
              {/* right */}
              <div className="w-full">
                <CountdownClock
                  startDate="2023-10-29T12:00:00"
                  d={10}
                  h={0}
                  m={0}
                  s={0}
                />
              </div>
            </div>
          </div>
        </Link>

        {/* card */}
        <Link to="http://anafshop.com/product/64e58e71e55d35b9c4662de3">
          <div className=" shadow-cardShadow p-3 rounded-lg min-w-[330px] border">
            <div className="flex flex-row justify-between items-center">
              {/* left */}
              <div className="flex justify-center items-center">
                <img
                  src="https://i.ibb.co/Jx5D0XD/Smart-Watch-Belt-Black-Color.png"
                  alt="t800"
                  className="max-w-[90px] min-w-[103px]"
                />
              </div>
              <div className="w-full">
                <h2 className="font-bold uppercase text-xs text-neutral-700">
                  Nylon Strap – Black Color
                </h2>
              </div>
              {/* right */}
              <div className="w-full">
                <CountdownClock
                  startDate="2023-10-29T12:00:00"
                  d={10}
                  h={0}
                  m={0}
                  s={0}
                />
              </div>
            </div>
          </div>
        </Link>

        {/* card */}
        <Link to="http://anafshop.com/product/64e58daae55d35b9c4662de0">
          <div className=" shadow-cardShadow p-3 rounded-lg min-w-[330px] border">
            <div className="flex flex-row justify-between items-center">
              {/* left */}
              <div className="flex justify-center items-center">
                <img
                  src="https://i.ibb.co/djdN8WQ/Smart-Watch-Belt-Navy-Blue-Color.png"
                  alt="t800"
                  className="max-w-[90px] min-w-[103px]"
                />
              </div>
              <div className="w-full">
                <h2 className="font-bold uppercase text-xs text-neutral-700">
                  Nylon Strap – green Color
                </h2>
              </div>
              {/* right */}
              <div className="w-full">
                <CountdownClock
                  startDate="2023-10-29T12:00:00"
                  d={10}
                  h={0}
                  m={0}
                  s={0}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BestOffer;

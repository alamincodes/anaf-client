import React, { useEffect, useState } from "react";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { HiOutlineX } from "react-icons/hi";
const HeaderContact = () => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("headerContact") === null) {
      localStorage.setItem("headerContact", "true");
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("headerContact") === "true") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [open]);
  const handleClose = () => {
    localStorage.setItem("headerContact", "false");
    setOpen(false);
  };
  return (
    <header className=" bg-white ">
      {open && (
        <div className="container mx-auto hidden lg:flex justify-between ">
          <h2 className=" inline-flex items-center font-semibold">
            <span className="mr-1 ">
              <BiMailSend size={20} />
            </span>
            anafshop.com@gmail.com
          </h2>
          <div className="flex items-center ">
            <a href="tel:01630328733" className="inline-flex items-center">
              <span className="mr-1">
                <BiPhoneCall size={20} />
              </span>
              01630328733
            </a>
            <span
              onClick={handleClose}
              className="ml-2 cursor-pointer bg-gray-200 hover:bg-gray-300 duration-200 rounded-full p-1"
            >
              <HiOutlineX size={15} />
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderContact;

import React, { useState } from "react";
import { VscCopy } from "react-icons/vsc";
import { HiOutlineCheck } from "react-icons/hi";
import CopyToClipboard from "react-copy-to-clipboard";
import bkash from "../../assets/icons/bkash.svg";
import nagad from "../../assets/icons/nagad.svg";
const BkashAndNagad = () => {
  const [copied, setCopied] = useState(false);
  return (
    <div>
        {/* ---Bkash card---- */}
      <div className="bg-gray-50 my-10 p-5">
        {/* bkash */}
        <div className="border-2 border-dashed bg-white p-2">
          <h2 className="flex items-center justify-center font-bold border-b-2 border-dashed">
            <img src={bkash} className="w-8 h-9 mr-1" alt="" /> Bkash
          </h2>
          <div className="flex justify-center items-center flex-col ml-5">
            <p className="font-semibold text-xl">Send money</p>
            {/* number */}
            <div className="flex items-center shadow-md p-3 rounded-sm">
              <h2 className="">01830328733</h2>
              <CopyToClipboard
                text="01830328733"
                onCopy={() => setCopied(true)}
              >
                <span
                  className={`ml-2 ${
                    copied ? "bg-green-200" : "bg-gray-200"
                  } rounded-full p-1`}
                >
                  {copied ? <HiOutlineCheck /> : <VscCopy size={18} />}
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkashAndNagad;

import React, { useState } from "react";
import { VscCopy } from "react-icons/vsc";
import { HiOutlineCheck, HiOutlineClipboardCheck } from "react-icons/hi";
import CopyToClipboard from "react-copy-to-clipboard";
import bkash from "../../assets/icons/bkash.svg";
import nagad from "../../assets/icons/nagad.svg";
const BkashAndNagad = () => {
  const [bkashCopied, setBkashCopied] = useState(false);
  const [nagadCopied, setNagadCopied] = useState(false);
  return (
    <div className="flex md:flex-row flex-col md:justify-center md:items-center">
      {/* ---Bkash card---- */}
      <div className="bg-gray-50 p-5">
        {/* bkash */}
        <div className="border-2 border-dashed bg-white p-2">
          <h2 className="flex items-center justify-center font-bold border-b-2 border-dashed">
            <img src={bkash} className="w-8 h-9 mr-1" alt="" /> Bkash
          </h2>
          <div className="flex justify-center items-center flex-col mx-5">
            <p className="font-semibold text-xl">Send money</p>
            {/* number */}
            <div className="flex items-center shadow-md p-3 rounded-sm">
              <h2 className="text-[#e2136e] font-semibold">01830328733</h2>
              <CopyToClipboard
                text="01830328733"
                onCopy={() => setBkashCopied(true)}
              >
                <span
                  className={`ml-2 ${
                    bkashCopied ? "bg-[#e2136e] text-white" : "bg-gray-200"
                  } rounded-full p-1`}
                >
                  {bkashCopied ? <HiOutlineClipboardCheck /> : <VscCopy size={18} />}
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
      {/* ---Nagad card---- */}
      <div className="bg-gray-50 p-5">
        {/* bkash */}
        <div className="border-2 border-dashed bg-white p-2 py-3">
          <h2 className="flex items-center justify-center font-bold border-b-2 border-dashed">
            <img src={nagad} className="w-5 h-7 mr-1" alt="" /> Nagad
          </h2>
          <div className="flex justify-center items-center flex-col mx-3">
            <p className="font-semibold text-xl">Send money</p>
            {/* number */}
            <div className="flex items-center shadow-md p-3 rounded-sm">
              <h2 className="text-[#ec1c24] font-semibold">01830328733</h2>
              <CopyToClipboard
                text="01830328733"
                onCopy={() => setNagadCopied(true)}
              >
                <span
                  className={`ml-2 ${
                    nagadCopied ? "bg-[#f6921e] text-white" : "bg-gray-200"
                  } rounded-full p-1`}
                >
                  {nagadCopied ? <HiOutlineClipboardCheck /> : <VscCopy size={18} />}
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

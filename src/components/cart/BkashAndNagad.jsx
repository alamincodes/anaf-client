import React, { useState } from "react";
import { VscCopy } from "react-icons/vsc";
import { HiOutlineCheck, HiOutlineClipboardCheck } from "react-icons/hi";
import CopyToClipboard from "react-copy-to-clipboard";
import bkash from "../../assets/icons/bkash.svg";
import nagad from "../../assets/icons/nagad.svg";
const BkashAndNagad = ({ discountTotal, setPayWith, setTransactionId }) => {
  const [bkashCopied, setBkashCopied] = useState(false);
  const [nagadCopied, setNagadCopied] = useState(false);
  return (
    <div>
      <div className="flex md:flex-row flex-col md:items-center">
        {/* ---Bkash card---- */}
        <div className="bg-gray-50 p-5 w-full">
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
                    {bkashCopied ? (
                      <HiOutlineClipboardCheck />
                    ) : (
                      <VscCopy size={18} />
                    )}
                  </span>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
        {/* ---Nagad card---- */}
        <div className="bg-gray-50 p-5 w-full">
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
                    {nagadCopied ? (
                      <HiOutlineClipboardCheck />
                    ) : (
                      <VscCopy size={18} />
                    )}
                  </span>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* transaction id */}
      <div className="w-full ">
        <div className="border-2 border-dashed border-gray-400 p-2 mb-5">
          <h2 className="text-md">Subtotal : {discountTotal} Tk</h2>
          <h2 className="text-md border-b-2 border-dashed">
            Delivery fee : 130 Tk
          </h2>
          <h2 className="text-md font-semibold">
            Total pay : {discountTotal + 130} Tk
          </h2>
        </div>
        {/* select bkash and nagad */}
        <div className="border-2 border-dashed border-gray-400 p-2 mb-5 ">
          <div className="flex items-center gap-5">
            <div>
              <input
                type="radio"
                name="selectPayment"
                value="bkash"
                id="Bkash"
                defaultChecked
                onChange={(e) => setPayWith(e.target.value)}
                className="peer hidden [&:checked_+_label_svg]:block"
              />

              <label
                htmlFor="Bkash"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 "
              >
                <div className="flex items-center gap-2">
                  <HiOutlineCheck className="hidden bg-black text-white ro" />

                  <p className="text-black flex items-center">
                    <img src={bkash} className="w-7 h-8" alt="" />
                    Bkash
                  </p>
                </div>
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="selectPayment"
                value="nagad"
                id="nagad"
                onChange={(e) => setPayWith(e.target.value)}
                className="peer hidden [&:checked_+_label_svg]:block"
              />

              <label
                htmlFor="nagad"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 "
              >
                <div className="flex items-center gap-2">
                  <HiOutlineCheck className="hidden bg-black text-white ro" />

                  <p className="text-black flex items-center">
                    <img src={nagad} className="w-5 h-7 mr-1" alt="" />
                    Nagad
                  </p>
                </div>
              </label>
            </div>
          </div>
          <h2 className="text-md font-secondary mt-1">
            Bkash অথবা Nagad সিলেক্ট করে Payment করার পর Transaction Id টি দিয়ের
            অর্ডার Confirm করুন।
          </h2>
          <label className="text-sm font-medium text-gray-700">
            Transaction Id
          </label>
          <input
            type="text"
            placeholder="Transaction Id"
            onChange={(e) => setTransactionId(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-400 shadow-sm p-2 border outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default BkashAndNagad;

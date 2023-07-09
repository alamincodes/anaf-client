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
      {/* transaction id */}
      <div className="w-full">
        <div className="border-2 border-dashed border-gray-400 p-2 mb-5">
          <h2 className="text-md">Subtotal : {discountTotal} Tk</h2>
          <h2 className="text-md border-b-2 border-dashed">
            Delivery fee : 120 Tk
          </h2>
          <h2 className="text-md font-semibold">
            Total : {discountTotal + 120} Tk
          </h2>
        </div>
        {/* select bkash and nagad */}
        <div className="border-2 border-dashed border-gray-400 p-2 mb-5">
          {/* number start */}
          <div className="mb-5">
            {/* bkash */}
            <div className="flex items-center">
              <h2 className="flex items-center">
                <img src={bkash} className="w-7 h-7" alt="" />{" "}
                <span>01630328733</span>
              </h2>

              <CopyToClipboard
                text="01830328733"
                onCopy={() => setBkashCopied(true)}
              >
                <span
                  className={`ml-2 ${
                    bkashCopied ? "bg-[#d41065]/70 text-white" : "bg-gray-300"
                  }  flex justify-center items-center p-1 rounded-full`}
                >
                  {bkashCopied ? (
                    <HiOutlineClipboardCheck />
                  ) : (
                    <VscCopy size={15} />
                  )}
                </span>
              </CopyToClipboard>
            </div>
            {/* nagad */}
            <div className="flex items-center mt-1">
              <h2 className="flex items-center">
                <img src={nagad} className="w-7 h-5" alt="" />{" "}
                <span>01630328733</span>
              </h2>

              <CopyToClipboard
                text="01830328733"
                onCopy={() => setNagadCopied(true)}
              >
                <span
                  className={`ml-2 ${
                    nagadCopied ? "bg-[#f6921e]/70 text-white" : "bg-gray-300"
                  }  flex justify-center items-center p-1 rounded-full`}
                >
                  {nagadCopied ? (
                    <HiOutlineClipboardCheck />
                  ) : (
                    <VscCopy size={15} />
                  )}
                </span>
              </CopyToClipboard>
            </div>
            <ul className="list-disc px-6">
              <li className="text-md font-secondary mt-1">
                Bkash personal number তায় Send money অপশন সিলেক্ট করে পেমেন্ট
                করুন।
              </li>
              <li className="text-md font-secondary mt-1">
                Bkash অথবা Nagad সিলেক্ট করে Payment করার পর Transaction Id টি
                দিয়ের অর্ডার Confirm করুন।
              </li>
            </ul>
          </div>
          {/* number end */}
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
                    <img src={bkash} className="w-7 h-7" alt="" />
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
            className="mt-1 w-full rounded-md border-purple-600 shadow-primary border-2 p-2 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default BkashAndNagad;

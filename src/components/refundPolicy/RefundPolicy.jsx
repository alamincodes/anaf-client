import React from "react";
import { CheckIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";

const RefundPolicy = () => {
  return (
    <section className="my-5">
      <div className="myContainer font-secondary">
        <h4 className="text-4xl font-bold">
          <span className="text-orange-500">রিফান্ড</span> পলিসি
        </h4>
        <div className="mt-5">
          <ul className="space-y-5 list-item font-medium text-lg">
            <li className="flex items-start">
              <span className="bg-orange-500 rounded-full mr-1">
                <CheckIcon className="h-6 w-6 text-white p-[5px]" />
              </span>
              অর্ডার করার 12 ঘন্টার মধ্যে আপনাকে রিফান্ড এর জন্য রিকুয়েস্ট করতে
              হবে।
            </li>
            <li className="flex items-start">
              <span className="bg-orange-500 rounded-full mr-1">
                <CheckIcon className="h-6 w-6 text-white p-[5px]" />
              </span>
              12 ঘন্টার বেশি হলে রিকুয়েস্ট প্রহন করা হবে না। কারন আমরা 12 ঘন্টার
              মধ্যে ডেলিভারির জন্য ডেলিভারি হাবে পাঠিয়ে দেই।
            </li>
            <li className="flex items-start">
              <span className="bg-orange-500 rounded-full mr-1">
                <CheckIcon className="h-6 w-6 text-white p-[5px]" />
              </span>
              রিফান্ড এর টাকা কোনভাবেই সরাসরি ক্যাশ ট্রানজেকশন করা হবে না। আপনি
              আমাদের প্লাটফর্ম থেকে আপনার পছন্দের পেমেন্ট চ্যানেলে পেমেন্ট করতে
              পারবেন এবং রিফান্ড দেয়ার সময় আপনি যে মাধ্যমে পেমেন্ট করেছিলেন, সেই
              মাধ্যমেই রিফান্ড করার চেষ্টা করা হবে। রিফান্ড করতে গিয়ে সংশ্লিষ্ট
              মাধ্যমে কোন সার্ভিস চার্জ প্রযোজ্য হলে সেই চার্জ কাস্টোমারকে বহন
              করতে হবে।
            </li>
            <li className="flex items-start">
              <span className="bg-orange-500 rounded-full mr-1">
                <CheckIcon className="h-6 w-6 text-white p-[5px]" />
              </span>
              রিফান্ড রিকুয়েস্ট কর্তৃপক্ষ দ্বারা সফলভাবে প্রক্রিয়াকৃত এবং
              অনুমোদিত হওয়ার সর্বোচ্চ 5-7 কার্যদিবসের মধ্যে ব্যবহারকারী বিকাশের
              মাধ্যমে টাকা পেয়ে যাবেন।
            </li>
            <li className="flex items-start">
              <span className="bg-orange-500 rounded-full mr-1">
                <CheckIcon className="h-6 w-6 text-white p-[5px]" />
              </span>
              রিফান্ড করতে গিয়ে সংশ্লিষ্ট মাধ্যমে কোন সার্ভিস চার্জ প্রযোজ্য হলে
              সেই চার্জ কাস্টোমারকে বহন করতে হবে।
            </li>
          </ul>

          <div className="shadow border-l-4 border-orange-500 flex md:flex-row flex-col items-center bg-white mt-5 p-5 text-lg font-bold">
            <h5 className="bg-orange-500 mr-5 p-4 rounded-full md:mb-0 mb-5">
              <ReceiptRefundIcon className="w-6 h-6 text-white" />
            </h5>
            <div className="flex md:justify-between items-center md:flex-row flex-col w-full">
              <h3 className="text-center">
                রিফান্ড রিকুয়েস্ট এর জন্য এই নাম্বারে যোগাযোগ করুন {""}
                <span className="text-orange-500">01630328733</span>
              </h3>
              <a href="tel:01630328733" className="md:mt-0 mt-2">
                <button className="bg-neutral-800 hover:bg-neutral-900 duration-300 px-4 py-2 text-white rounded">
                  কল করুন
                </button>
              </a>
            </div>
          </div>
          <div className="shadow border-l-4 border-orange-500 flex md:flex-row flex-col items-center bg-white mt-5 p-5 text-lg font-bold">
            <h5 className="bg-orange-500 mr-5 p-4 rounded-full md:mb-0 mb-5">
              <ReceiptRefundIcon className="w-6 h-6 text-white" />
            </h5>
            <div className="flex md:justify-between items-center md:flex-row flex-col w-full">
              <h3 className="text-center">
                রিফান্ড রিকুয়েস্ট এর জন্য এই ইমেলে যোগাযোগ করুন {""}
                <span className="text-orange-500">anafshop.com@gmail.com</span>
              </h3>
              <a href="mailto:anafshop.com@gmail.com" className="md:mt-0 mt-2">
                <button className="bg-neutral-800 hover:bg-neutral-900 duration-300 px-4 py-2 text-white rounded">
                  মেইল করুন
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;

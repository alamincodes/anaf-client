import React from "react";
import { HiCheck } from "react-icons/hi";
const SuccessModal = ({ title, setOpenModal }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center flex-col">
                <h3 className="bg-green-500 p-1 rounded-full text-white">
                  <HiCheck size={30} />
                </h3>
                <h2 className="font-medium text-2xl mt-4">{title}</h2>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex justify-end ">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="inline-flex w-full justify-center bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

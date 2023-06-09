import React from "react";
import AnimatePage from "../Shared/AnimatePage";
import { HiCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
const OrderSuccessModal = ({ orderId }) => {
  return (
    <AnimatePage>
      <div>
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <HiCheck className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Your order has been received
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 my-2">
                          Your order Id:{" "}
                          <span className="text-black bg-gray-100 p-1 rounded-sm">
                            {orderId}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Payment verification and order confirmation will be
                          undertaken.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Link to="/orders">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    >
                      See order
                    </button>
                  </Link>
                  <Link to="/">
                    <button
                      type="button"
                      className="inline-flex w-full md:mt-auto mt-2 justify-center rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                    >
                      Home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default OrderSuccessModal;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import successIcon from "../../assets/icons/success.png";
import { Link } from "react-router-dom";
const CodSuccessOrder = ({ successModal, setSuccessModal }) => {
  return (
    <>
      <Transition appear show={successModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSuccessModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md relative transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  ></Dialog.Title>
                  <div className=" absolute -top-10 left-5 z-50">
                    <img src={successIcon} alt="" />
                  </div>
                  <div className="font-secondary mt-10">
                    <p className="text-lg text-neutral-700 font-bold">
                      আপনার অর্ডারটি রিসিভ হয়েছে।👏
                    </p>
                    <p className="text-lg text-neutral-700">
                      শিগ্রই আমাদের প্রতিনিধি আপানার সাথে যোগাযোগ করে অর্ডারটি
                      কনফার্ম করবেন।
                    </p>
                  </div>

                  <div className="text-right">
                    <Link to="/orders" >
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-black text-white px-4 py-2 text-sm font-medium outline-none"
                        onClick={() => setSuccessModal(false)}
                      >
                        See order
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CodSuccessOrder;

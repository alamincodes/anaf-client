import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                  </Dialog.Title>
                  <div className="mt-2 font-secondary">
                    <p className="text-lg text-neutral-700">
                      আপনার অর্ডারটি রিসিভ হয়েছে।
                    </p>
                    <p className="text-lg text-neutral-700">
                      শিগ্রই আমাদের প্রতিনিধি আপানার সাথে যোগাযোগ করবেন।
                    </p>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black text-white px-4 py-2 text-sm font-medium "
                      onClick={() => setSuccessModal(false)}
                    >
                      See order
                    </button>
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

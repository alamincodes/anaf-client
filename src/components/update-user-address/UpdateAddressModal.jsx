import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useRef } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateAddressModal = ({ openModal, setOpenModal }) => {
  const { logOut, user } = useContext(AUTH_CONTEXT);
  let completeButtonRef = useRef(null);
  const {
    data: userData = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(
        `https://anaf-server.vercel.app/users?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  // console.log(userData);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const division = form.division.value;
    const district = form.district.value;
    const address = form.address.value;
    const phone = form.phone.value;
    const updateUserAddress = {
      division,
      district,
      address,
      phone,
    };
    // console.log(orderStatus);
    fetch(`https://anaf-server.vercel.app/update-address/${userData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updateUserAddress),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          refetch();
          setOpenModal(false);
          toast("Update address", {
            icon: "🚀",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
  };
  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={completeButtonRef}
          onClose={() => setOpenModal(false)}
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
                    Update <span className="text-orange-500">Address</span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleUpdate}>
                      <label>
                        Division
                        <input
                          type="text"
                          defaultValue={userData.division}
                          className="border border-orange-400 w-full outline-none px-2 py-1 rounded bg-orange-50"
                          name="division"
                          placeholder="Division"
                          required
                        />
                      </label>
                      <label>
                        District
                        <input
                          type="text"
                          defaultValue={userData.district}
                          className="border border-orange-400 w-full outline-none px-2 py-1 rounded bg-orange-50"
                          name="district"
                          placeholder="District"
                          required
                        />
                      </label>
                      <label>
                        Phone
                        <input
                          type="text"
                          defaultValue={userData.phone}
                          className="border border-orange-400 w-full outline-none px-2 py-1 rounded bg-orange-50"
                          name="phone"
                          placeholder="Phone"
                          required
                        />
                      </label>
                      <label>
                        Address
                        <textarea
                          type="text"
                          defaultValue={userData.address}
                          className="border border-orange-400 w-full outline-none px-2 py-1 rounded bg-orange-50"
                          name="address"
                          placeholder="Address"
                          required
                        />
                      </label>

                      <div className="mt-4 text-right">
                        <button
                          type="submit"
                          disabled={isLoading}
                          ref={completeButtonRef}
                          className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                        >
                          {isLoading ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </form>
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

export default UpdateAddressModal;

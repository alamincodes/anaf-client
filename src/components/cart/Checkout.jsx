import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import BkashAndNagad from "./BkashAndNagad";
import { HiOutlineCheck } from "react-icons/hi";
import bkash from "../../assets/icons/bkash.svg";
import nagad from "../../assets/icons/nagad.svg";
import { TbTruckDelivery } from "react-icons/tb";

const Checkout = () => {
  useTitle("Checkout");
  const { user } = useContext(AUTH_CONTEXT);
  const { items, cartTotal } = useCart();
  const [paymentMode, setPaymentMode] = useState("Cash on delivery");
  const [userFullInfo, setUserFullInfo] = useState({});
  const [discountTotal, setDiscountTotal] = useState(cartTotal);
  const [discountError, setDiscountError] = useState("");
  const [payWith, setPayWith] = useState("bkash");
  const [transactionId, setTransactionId] = useState("");

  const handleDelivery = (value) => {
    if (
      value === "Cumilla" ||
      value === "cumilla" ||
      value === "comilla" ||
      value === "Comilla"
    ) {
      setDeliveryFee(60);
    } else {
      setDeliveryFee(130);
    }
  };

  const handleDiscount = (e) => {
    e.preventDefault();
    const discountValue = e.target.discount.value;
    const code = import.meta.env.VITE_DISCOUNT_CODE;
    console.log(code);
    setDiscountError("");

    if (discountValue !== code) {
      setDiscountError("discount code you have provided is not valid.");
    }
    if (cartTotal < 600) {
      setDiscountError(
        "discount code is valid for purchases with a minimum value of 600 TK."
      );
      return;
    }

    if (discountValue === code && cartTotal >= 600) {
      setDiscountTotal(cartTotal - 100);
      setDiscountError("");
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const districtName = form.district.value;
    const division = form.division.value;
    const address = form.address.value;
    const selectPaymentType = paymentMode;
    const payWithC = payWith;

    console.log(paymentMode);
    console.log(payWithC);
    console.log(transactionId);
    const orderInfo = {
      name,
      email,
      phone,
      districtName,
      division,
      address,
      selectPaymentType,
      items,
      cartTotal,
      discountTotal,
      deliveryFee: 130,
      total: discountTotal + 130,
      payWith,
      transactionId,
    };
    console.log(orderInfo);
  };

  useEffect(() => {
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserFullInfo(data);
      });
  }, [user, userFullInfo]);
  return (
    <AnimatePage>
      <section className="container mx-auto">
        <div className="flex justify-between md:flex-row flex-col">
          <div className="bg-gray-50 py-12 md:py-18">
            <div>
              <div>
                <p className="text-sm font-medium tracking-tight text-gray-900">
                  Subtotal Tk. {discountTotal}
                </p>

                <p className="text-sm font-medium tracking-tight text-gray-900">
                  Shipping fee Tk. 130
                </p>

                <p className="text-2xl font-medium tracking-tight text-gray-900">
                  Total Tk. {discountTotal + 130}
                </p>

                {/* --- discount form ---*/}
                <div className="mb-5">
                  <form onSubmit={handleDiscount} className=" ">
                    <label className="text-sm font-medium text-gray-700">
                      Discount coupon
                    </label>
                    <div className="relative md:w-[250px] w-[200px]">
                      <input
                        type="text"
                        name="discount"
                        className="mt-1 px-3 border-2 border-gray-500 w-full relative shadow-sm p-1 rounded outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-black text-xs  rounded absolute top-[5px] right-0 text-white py-[10px] px-4"
                      >
                        Apply
                      </button>
                    </div>
                    {discountError && (
                      <p className="text-red-500">{discountError}</p>
                    )}
                  </form>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  For the purchase of
                </p>
              </div>

              <div>
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li
                        className="flex items-center gap-4 py-4"
                        key={item.id}
                      >
                        <img
                          src={item.img}
                          alt=""
                          className="h-16 w-16 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">{item.name}</h3>

                          <dl className="mt-0.5 space-y-px text-[13px] text-gray-600">
                            <div className="font-normal">
                              <dt className="inline">Quantity:</dt>
                              <dd className="inline">{item.quantity}</dd>
                            </div>

                            <div className="font-normal">
                              <dt className="inline">Price:</dt>
                              <dd className="inline">{item.price}</dd>
                            </div>
                          </dl>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* User order data */}
          <div className="bg-white py-12 md:py-24 col-span-3 ">
            <div className="px-4 lg:px-8">
              <form onSubmit={handleOrder}>
                <div className="flex md:flex-row flex-col gap-5">
                  <div className="w-full">
                    <label className=" text-xs font-medium text-gray-700">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.displayName}
                      className="mt-1 w-full  rounded-md border-gray-200 shadow-sm p-2 border outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <label className=" text-xs font-medium text-gray-700">
                      Email
                    </label>

                    <input
                      type="text"
                      disabled
                      name="email"
                      defaultValue={user?.email}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
                    />
                  </div>
                </div>
                <div className="flex md:flex-row flex-col gap-5">
                  <div className="w-full">
                    <label className=" text-xs font-medium text-gray-700">
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      defaultValue={userFullInfo.phone}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
                    />
                  </div>
                  {/* division */}
                  <div className="w-full">
                    <label className="text-xs font-medium text-gray-700">
                      Division
                    </label>
                    <input
                      type="text"
                      name="division"
                      defaultValue={userFullInfo.division}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
                    />
                  </div>
                </div>

                <div className="flex md:flex-row flex-col gap-5">
                  {/* district */}
                  <div className="w-full">
                    <label className=" text-xs font-medium text-gray-700">
                      District
                    </label>

                    <input
                      type="text"
                      name="district"
                      onChange={(e) => handleDelivery(e.target.value)}
                      defaultValue={userFullInfo.district}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <label className=" text-xs font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      type="text"
                      name="address"
                      defaultValue={userFullInfo.address}
                      rows={1}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
                    />
                  </div>
                </div>
                {/* select payment */}
                <h2 className="font-medium text-xs mt-4">
                  Select payment type
                </h2>
                <div className="flex md:flex-row flex-col items-center gap-4 my-3">
                  {/* cash on deliver */}
                  <div className="w-full">
                    <input
                      type="radio"
                      name="selectPayment"
                      value="Cash on delivery"
                      id="Cash"
                      defaultChecked
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="peer hidden [&:checked_+_label_svg]:block"
                    />

                    <label
                      htmlFor="Cash"
                      className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-black peer-checked:ring-1 peer-checked:ring-black"
                    >
                      <div className="flex items-center gap-2">
                        <HiOutlineCheck className="hidden bg-black text-white ro" />

                        <p className="text-black flex items-center">
                          Cash on delivery{" "}
                          <TbTruckDelivery className="w-7 h-9 ml-1" />{" "}
                        </p>
                      </div>
                    </label>
                  </div>
                  {/* Online payment */}
                  <div className="w-full">
                    <input
                      type="radio"
                      name="selectPayment"
                      value="Online Payment"
                      id="onlinePayment"
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="peer hidden [&:checked_+_label_svg]:block"
                    />

                    <label
                      htmlFor="onlinePayment"
                      className="flex cursor-pointer items-center rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-black peer-checked:ring-1 peer-checked:ring-black"
                    >
                      <div className="flex items-center gap-2">
                        <HiOutlineCheck className="hidden bg-black text-white ro" />

                        <p className="text-gray-900">Online Payment</p>

                        <div className="flex items-center">
                          <img src={bkash} className="w-7 h-9" alt="" />
                          <img src={nagad} className="w-6" alt="" />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                {/* ---------- */}
                {paymentMode === "Online Payment" && (
                  <BkashAndNagad
                    discountTotal={discountTotal}
                    setPayWith={setPayWith}
                    setTransactionId={setTransactionId}
                  />
                )}
                <div className="mt-10">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Checkout;

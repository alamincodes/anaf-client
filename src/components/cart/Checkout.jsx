import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import AnimatePage from "../Shared/AnimatePage";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import BkashAndNagad from "./BkashAndNagad";
import { HiOutlineCheck, HiOutlineClipboardCheck } from "react-icons/hi";
import bkash from "../../assets/icons/bkash.svg";
import nagad from "../../assets/icons/nagad.svg";
import { TbTruckDelivery } from "react-icons/tb";
import { format } from "date-fns";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { VscCopy } from "react-icons/vsc";
import LoadingSpinner from "../Shared/LoadingSpinner";
import OrderSuccessModal from "../orders/OrderSuccessModal";
const Checkout = () => {
  useTitle("Checkout");
  const { user } = useContext(AUTH_CONTEXT);
  const { items, cartTotal, emptyCart } = useCart();
  const [paymentMode, setPaymentMode] = useState("Cash on delivery");
  const [userFullInfo, setUserFullInfo] = useState({});
  const [discountTotal, setDiscountTotal] = useState(cartTotal);
  const [discountError, setDiscountError] = useState("");
  const [payWith, setPayWith] = useState("bkash");
  const [transactionId, setTransactionId] = useState("");
  const [errorMessage, setSetErrorMessage] = useState("");
  const [bkashCopied, setBkashCopied] = useState(false);
  const [nagadCopied, setNagadCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  // const handleDiscount = (e) => {
  //   e.preventDefault();
  //   const discountValue = e.target.discount.value;
  //   const code = import.meta.env.VITE_DISCOUNT_CODE;
  //   console.log(code);
  //   setDiscountError("");

  //   if (discountValue !== code) {
  //     setDiscountError("discount code you have provided is not valid.");
  //   }
  //   if (cartTotal < 600) {
  //     setDiscountError(
  //       "discount code is valid for purchases with a minimum value of 600 TK."
  //     );
  //     return;
  //   }

  //   if (discountValue === code && cartTotal >= 600) {
  //     setDiscountTotal(cartTotal - 100);
  //     toast("You have successfully received a discount of 100 Tk.", {
  //       icon: "🎉",
  //       style: {
  //         borderRadius: "10px",
  //         background: "black",
  //         color: "white",
  //       },
  //     });
  //     setDiscountError("");
  //   }
  // };

  const handleOrder = (e) => {
    e.preventDefault();
    setSetErrorMessage("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const districtName = form.district.value;
    const division = form.division.value;
    const address = form.address.value;
    const selectPaymentType = paymentMode;

    if (transactionId === "") {
      setSetErrorMessage(
        "Kindly make the payment and provide the transaction ID."
      );
      return;
    }

    console.log(isLoading);
    // console.log(payWithC);
    // console.log(transactionId);
    const orderDate = format(new Date(), "PP");
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
      deliveryFee: 120,
      total: discountTotal + 120,
      payWith,
      transactionId,
      orderDate,
    };

    console.log(orderInfo);
    setIsLoading(true);
    fetch("https://anaf-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        emptyCart();
        setSuccessModal(true);
        if (data.insertedId) {
          setIsLoading(false);
          setOrderId(data.insertedId);
        }
        console.log(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setSetErrorMessage("Try agin something is wrong");
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserFullInfo(data);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AnimatePage>
      <>
        <section className="container mx-auto">
          <div className="flex justify-between md:gap-3 md:flex-row flex-col">
            <div className="bg-gray-50 md:py-4 p-4">
              <div>
                <div>
                  <p className="text-sm font-medium tracking-tight text-gray-900">
                    Subtotal Tk. {discountTotal}
                  </p>

                  <p className="text-sm font-medium tracking-tight text-gray-900">
                    Shipping fee Tk. 120
                  </p>

                  <p className="text-2xl font-medium tracking-tight text-gray-900">
                    Total Tk. {discountTotal + 120}
                  </p>

                  {/* --- discount form ---*/}
                  {/* <div className="mb-5">
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
                  </div> */}
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
                            <h3 className="text-sm text-gray-900">
                              {item.name}
                            </h3>

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
                        name="division"
                        defaultValue={userFullInfo.division}
                        className="border rounded-sm outline-none font-normal p-2 w-full "
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
                        name="district"
                        defaultValue={userFullInfo.district}
                        className="border rounded-sm outline-none font-normal p-2 w-full "
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
                        className={`flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 text-sm font-medium shadow-primary ${
                          paymentMode === "Cash on delivery" &&
                          "border-2 border-black"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {paymentMode === "Cash on delivery" && (
                            <span className="bg-black text-white rounded-full p-[2px]">
                              {" "}
                              <HiOutlineCheck size={15} />
                            </span>
                          )}

                          <p className="text-black flex items-center">
                            <TbTruckDelivery className="w-7 h-9 mr-1" /> Cash on
                            delivery{" "}
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
                        className={`flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 text-sm font-medium shadow-primary ${
                          paymentMode === "Online Payment" &&
                          "border-2 border-black"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {paymentMode === "Online Payment" && (
                            <span className="bg-black text-white rounded-full p-[2px]">
                              {" "}
                              <HiOutlineCheck size={15} />
                            </span>
                          )}
                          <div className="flex items-center">
                            <img src={bkash} className="w-7 h-9" alt="" />
                            <img src={nagad} className="w-6" alt="" />
                          </div>{" "}
                          <p className="text-gray-900">Online Payment</p>
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
                  {paymentMode === "Cash on delivery" && (
                    <div>
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
                              bkashCopied
                                ? "bg-[#d41065]/70 text-white"
                                : "bg-gray-200"
                            } flex justify-center items-center p-1 rounded-full`}
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
                              nagadCopied
                                ? "bg-[#f6921e]/70 text-white"
                                : "bg-gray-200"
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
                      <div className="flex items-center gap-5 my-3">
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
                              <HiOutlineCheck className="hidden bg-black text-white " />

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
                              <HiOutlineCheck className="hidden bg-black text-white" />

                              <p className="text-black flex items-center">
                                <img
                                  src={nagad}
                                  className="w-5 h-8 mr-1"
                                  alt=""
                                />
                                Nagad
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                      <ul className="list-disc px-4">
                        <li className="text-md font-secondary mt-1">
                          Cash on delivery তে ২০০ টাকা অগ্রিম পরিশোধ করতে হবে।
                        </li>
                        <li className="text-md font-secondary mt-1">
                          Bkash অথবা Nagad সিলেক্ট করে Payment করার পর
                          Transaction Id টি দিয়ের অর্ডার Confirm করুন।
                        </li>
                      </ul>
                      <label className="text-sm font-medium text-gray-700">
                        Transaction Id
                      </label>
                      <input
                        type="text"
                        placeholder="Transaction Id"
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="mt-1 w-full rounded-sm border-orange-600 shadow-primary border-2 p-2 outline-none"
                      />
                    </div>
                  )}
                  <div className="mt-10">
                    {errorMessage && (
                      <p className="text-red-500 mt-1">{errorMessage}</p>
                    )}
                    <button
                      type="submit"
                      className="block w-full rounded-sm bg-black p-2.5 text-lg  text-white transition hover:shadow-lg"
                    >
                      Confirm order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {successModal && <OrderSuccessModal orderId={orderId} />}
      </>
    </AnimatePage>
  );
};

export default Checkout;

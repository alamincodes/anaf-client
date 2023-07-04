import React, { useEffect, useState } from "react";
import { MdFindInPage } from "react-icons/md";
import LoadingSpinner from "../Shared/LoadingSpinner";
const FindOrder = () => {
  const [id, setId] = useState("");
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const productId = e.target.productId.value;
    setId(productId);
    console.log(orderDetail);
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/find/${id}`, {
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderDetail(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [id]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex md:flex-row flex-col items-center gap-2"
      >
        <input
          type="text"
          name="productId"
          placeholder="id"
          className="mt-1 w-full border-gray-200 rounded shadow-sm p-2 border outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center text-sm md:w-auto w-full rounded bg-black text-white mt-1 p-[10px]"
        >
          <span>
            {" "}
            <MdFindInPage size={20} className="mr-1" />
          </span>{" "}
          Find <span className="ml-1">order</span>{" "}
        </button>
      </form>

      <div>
        <div className="container mx-auto bg-white md:px-20 md:py-10">
          <h2 className="md:text-3xl font-bold text-left uppercase">
            Order Details
          </h2>
          <h2 className=" mt-5">
            Order{" "}
            <span className="bg-gray-200 font-bold p-1">
              #{orderDetail._id}
            </span>{" "}
            was placed on {orderDetail.orderDate} and is currently{" "}
            <span className="bg-gray-200 p-1  font-bold">
              {orderDetail.status ? orderDetail.status : "pending"}
            </span>
          </h2>
          <div className="mt-5">
            {orderDetail.items?.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded mt-2 py-5 px-3 ">
                <div className="flex md:items-center items-start justify-between md:flex-row flex-col md:text-center items-left space-y-2">
                  <img
                    src={item.img}
                    alt=""
                    className="w-20 h-20 bg-cover rounded-md"
                  />
                  <h2>
                    {item.name} X {item.quantity}{" "}
                  </h2>
                  <h2>Price: {item.price} Tk</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 mt-3">
            {/* total */}
            <div className="shadow-sm border p-5">
              <h2 className="font-bold uppercase">Total Amount</h2>
              <h2>Subtotal: {orderDetail.cartTotal} Tk</h2>
              <h2>Delivery fee: 120 Tk</h2>
              <h2>Total: {orderDetail.total} Tk</h2>
            </div>
            {/* total */}
            <div className="shadow-sm border p-5">
              <h2 className="font-bold uppercase">Payment details</h2>
              <h2>Payment type: {orderDetail.selectPaymentType}</h2>
              <h2>Payment method: {orderDetail.payWith} </h2>
              <h2>Transaction Id: {orderDetail.transactionId}</h2>
              <h2>
                Pay:{" "}
                {orderDetail.selectPaymentType === "Cash on delivery"
                  ? "200"
                  : orderDetail.total}
                Tk
              </h2>
            </div>

            {/* billing address */}

            <div className="shadow-sm border p-5">
              <h2 className="font-bold uppercase">BILLING ADDRESS</h2>
              <h3>{orderDetail.name}</h3>
              <h3>{orderDetail.phone}</h3>
              <h3>{orderDetail.email}</h3>
              <h3>{orderDetail.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindOrder;

import React, { useEffect, useRef, useState } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import logo from "../../assets/logo/anaf.svg";
const Invoice = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();
  const pdfExportComponent = useRef(null);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/order/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setOrderDetail(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto">
      <div className="text-right my-1">
        <button
          className="bg-black w-full text-white p-2 rounded-sm"
          onClick={() => {
            if (pdfExportComponent.current) {
              pdfExportComponent.current.save();
            }
          }}
        >
          Download
        </button>
      </div>
      <PDFExport paperSize="A4" margin="1cm" ref={pdfExportComponent}>
        <section className="">
          <div className="bg-white">
            <article className="overflow-hidden">
              <div className="bg-[white] rounded-b-md">
                <div className="p-9">
                  <div>
                    <div className="flex justify-end">
                      <img src={logo} className="w-20 mb-10" alt="" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-light text-black">
                        <p className="text-lg font-normal text-black">
                          Invoice Detail:
                        </p>
                        <div className="mb-2 ">
                          <span className="font-bold">Order id:</span>{" "}
                          <span className="text-black">{orderDetail._id}</span>{" "}
                          <h2>
                            {" "}
                            <span className="font-bold">Order date:</span>{" "}
                            {orderDetail.orderDate}
                          </h2>
                          <h2 className="text-black font-bold mt-3">
                            Order status:{" "}
                            <span className="border border-black rounded-full p-1 px-2 ml-1">
                              {orderDetail?.status
                                ? orderDetail.status
                                : "pending"}
                            </span>
                          </h2>
                        </div>
                        <p>{orderDetail.name}</p>
                        <p>{orderDetail.districtName}</p>
                        <p>{orderDetail.address}</p>
                      </div>
                      <div className="text-sm font-light text-black">
                        <p className="text-sm font-normal text-black">
                          Billed To
                        </p>
                        <p>{orderDetail.phone}</p>
                        <p>{orderDetail.payWith}</p>
                        <p>Transaction Id: {orderDetail.transactionId}</p>
                        <p>{orderDetail.selectPaymentType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-9">
                  <div className="flex flex-col mx-0 mt-8">
                    <table className="min-w-full divide-y divide-black">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-black sm:pl-6 md:pl-0"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-right text-sm font-normal text-black sm:table-cell"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-right text-sm font-normal text-black sm:table-cell"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-black sm:pr-6 md:pr-0"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetail.items?.map((item) => (
                          <tr className="border-b border-black">
                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                              <div className="font-medium text-black">
                                {item.name}
                              </div>
                              <div className="mt-0.5 text-black sm:hidden">
                                1 unit at $0.00
                              </div>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-black sm:table-cell">
                              {item.quantity}
                            </td>

                            <td className="py-4 pl-3 pr-4 text-sm text-right text-black sm:pr-6 md:pr-0">
                              {item.price} Tk
                            </td>
                            <td className="py-4 pl-3 pr-4 text-sm text-right text-black sm:pr-6 md:pr-0">
                              {item.price * item.quantity} Tk
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-black sm:table-cell md:pl-0"
                          >
                            Subtotal
                          </th>
                          <th
                            scope="row"
                            className="pt-6 pl-4 pr-3 text-sm font-light text-left text-black sm:hidden"
                          >
                            Subtotal
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-black sm:pr-6 md:pr-0">
                            {orderDetail.cartTotal} Tk
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-black sm:table-cell md:pl-0"
                          >
                            Delivery fee
                          </th>
                          <th
                            scope="row"
                            className="pt-6 pl-4 pr-3 text-sm font-light text-left text-black sm:hidden"
                          >
                            Delivery fee
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-black sm:pr-6 md:pr-0">
                            130 Tk
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="hidden pt-4 pl-6 pr-3 text-sm font-bold text-right text-black sm:table-cell md:pl-0"
                          >
                            Total
                          </th>
                          <th
                            scope="row"
                            className="pt-4 font-bold pl-4 pr-3 text-sm text-left text-black sm:hidden"
                          >
                            Total
                          </th>
                          <td className="pt-4 pl-3 pr-4 text-sm font-bold text-right text-black sm:pr-6 md:pr-0">
                            {orderDetail.total} Tk
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </PDFExport>
    </div>
  );
};

export default Invoice;

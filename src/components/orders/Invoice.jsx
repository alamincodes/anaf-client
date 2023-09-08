import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import logo from "../../assets/logo/anaf.svg";
const Invoice = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://anaf-server.vercel.app/order/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setOrderDetail(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <section classname="">
      <div className="flex flex-row flex-wrap">
        <div className="mb-6 w-full max-w-full flex-shrink">
          <div className="rounded-lg bg-white p-2">
            <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-4 ">
              <div className="flex flex-col">
                <div className="mb-1 text-3xl font-bold">
                  <img
                    className="inline-block h-auto w-12 ltr:mr-2 rtl:ml-2"
                    src={logo}
                  />
                </div>
                <p className="text-sm">
                  Amphitheatre, Mountain View
                  <br />
                  San Francisco, CA 9321, US
                </p>
              </div>
              <div className="text-4xl font-bold uppercase">Invoice</div>
            </div>
            <div className="flex flex-row justify-between py-3">
              <div className="flex-1">
                <p>
                  <strong>Bill to:</strong>
                  <br />
                  James Doe
                  <br />
                  Andreas street, Mountain View
                  <br />
                  San Francisco, CA 9321, US
                  <br />
                  Andreas-Doe@domain.com
                  <br />
                  +123 456 7890
                </p>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex justify-between">
                  <div className="flex-1 font-semibold">Invoice ID#:</div>
                  <div className="flex-1 ltr:text-right rtl:text-left">
                    INV1089
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div className="flex-1 font-semibold">Invoice date:</div>
                  <div className="flex-1 ltr:text-right rtl:text-left">
                    12/08/2022
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div className="flex-1 font-semibold">Due date:</div>
                  <div className="flex-1 ltr:text-right rtl:text-left">
                    12/08/2022
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div className="flex-1 font-semibold">Status #:</div>
                  <div className="flex-1 ltr:text-right rtl:text-left">
                    Paid
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div className="flex-1 font-semibold">Payment #:</div>
                  <div className="flex-1 ltr:text-right rtl:text-left">
                    Paypal
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
              <table className="table-bordered w-full text-gray-600 ltr:text-left rtl:text-right">
                <thead className="border-b ">
                  <tr className="bg-gray-100">
                    <th>Products</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Unit price</th>
                    <th className="text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex flex-row flex-wrap items-center">
                        <div className="mb-1 flex-1 leading-5 ltr:ml-2 rtl:mr-2 text-black">
                          Nike Unisex-Child Free Rn (Big Kid)
                        </div>
                      </div>
                    </td>
                    <td className="text-center">1</td>
                    <td className="text-center">80$</td>
                    <td className="text-center">80$</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} />
                    <td className="text-center">
                      <b>Sub-Total</b>
                    </td>
                    <td className="text-center">$290</td>
                  </tr>
                  <tr>
                    <td colSpan={2} />
                    <td className="text-center">
                      <b>Discount</b>
                    </td>
                    <td className="text-center">15%</td>
                  </tr>
                  <tr>
                    <td colSpan={2} />
                    <td className="text-center">
                      <b>Tax</b>
                    </td>
                    <td className="text-center">5%</td>
                  </tr>
                  <tr>
                    <td colSpan={2} />
                    <td className="text-center">
                      <b>Total</b>
                    </td>
                    <td className="text-center font-bold">$258,8</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invoice;

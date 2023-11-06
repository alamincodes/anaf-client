import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();

  // const categories = [
  //   {
  //     id: 1,
  //     name: "powerBank",
  //   },
  //   {
  //     id: 2,
  //     name: "tripod",
  //   },
  //   {
  //     id: 3,
  //     name: "microphone",
  //   },
  //   {
  //     id: 4,
  //     name: "rechargeableFan",
  //   },
  //   {
  //     id: 5,
  //     name: "router",
  //   },
  //   {
  //     id: 6,
  //     name: "smartWatches",
  //   },
  //   {
  //     id: 7,
  //     name: "headphones",
  //   },
  //   {
  //     id: 8,
  //     name: "mouse",
  //   },
  // ];

  const handleAddProduct = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.productName.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const detail = form.detail.value;
    const id = form.pId.value;
    const outOfStock = form.outOfStock.value;
    const category = form.category.value;
    const productInfo = {
      name,
      category,
      price,
      quantity,
      detail,
      outOfStock,
      id,
    };
    // console.log(productInfo);
    fetch(`https://anaf-server.vercel.app/updateProduct/${productDetail._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          setIsLoading(false);
          toast.success("Update product");
          form.reset();
        }
      });
  };
  useEffect(() => {
    fetch(`https://anaf-server.vercel.app/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductDetail(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <section className="mb-5">
      <form onSubmit={handleAddProduct}>
        <label>id</label>
        <input
          type="text"
          name="pId"
          defaultValue={productDetail.id}
          placeholder="id"
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
        />
        <label>category</label>
        <input
          type="text"
          defaultValue={productDetail.category}
          name="category"
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
        />
        <label>Out of stock</label>
        <select
          name="outOfStock"
          className="border rounded-sm outline-none font-normal p-2 w-full "
        >
          <option value={false}>false</option>
          <option value={true}>true</option>
        </select>
        <label>Product name</label>
        <input
          type="text"
          defaultValue={productDetail.name}
          name="productName"
          required
          placeholder="Product name"
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          defaultValue={productDetail.price}
          required
          placeholder="Price"
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
        />
        <label>Quantity</label>
        <input
          type="text"
          name="quantity"
          defaultValue={productDetail.quantity}
          placeholder="quantity "
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
        />

        <label>details</label>
        <textarea
          name="detail"
          defaultValue={productDetail.detail}
          placeholder="Product detail  "
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
        />

        <button
          // disabled={isLoading}
          className="bg-black p-2 rounded w-full mt-3 text-white"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
    </section>
  );
};

export default EditProduct;

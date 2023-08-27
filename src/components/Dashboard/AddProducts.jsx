import React, { useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const AddProducts = () => {
  useTitle("Add Product");
  const [selectedImages, setSelectedImages] = useState([]);
  // const [uploadedUrls, setUploadedUrls] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  // const [product, setProduct] = useState([]);

  const { data: product = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://anaf-server.vercel.app/products", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data?.reverse();
    },
  });
  const categories = [
    {
      id: 1,
      name: "powerBank",
    },
    {
      id: 2,
      name: "tripod",
    },
    {
      id: 3,
      name: "microphone",
    },
    {
      id: 4,
      name: "rechargeableFan",
    },
    {
      id: 5,
      name: "router",
    },
    {
      id: 6,
      name: "smartWatches",
    },
    {
      id: 7,
      name: "headphones",
    },
    {
      id: 8,
      name: "mouse",
    },
  ];

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.productName.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const detail = form.detail.value;
    const id = form.pId.value;
    const outOfStock = "false";
    const category = form.category.value;

    const imageBBApiKey = import.meta.env.VITE_IMAGE_BB_API_KEY;
    try {
      const uploadPromises = selectedImages.map(async (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        return data.data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      const productInfo = {
        name,
        category,
        price,
        quantity,
        detail,
        outOfStock,
        img: uploadedUrls,
        id,
      };
      setAddLoading(true);
      fetch("https://anaf-server.vercel.app/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(productInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            form.reset();
            refetch();
            setAddLoading(false);
            toast.success("product added");
          }
        });
    } catch (error) {
      console.error("Error uploading images:", error);
      setAddLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-medium">Add products</h2>
      </div>
      <div className="flex justify-center items-center ">
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="pId"
            placeholder="id"
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
          />
          <select
            name="category"
            className="border rounded-sm outline-none font-normal p-2 w-full "
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="productName"
            required
            placeholder="Product name"
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
          />
          <input
            type="number"
            name="price"
            required
            placeholder="Price"
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
          />
          <input
            type="number"
            name="quantity"
            defaultValue={1}
            placeholder="quantity "
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
          />
          <textarea
            name="detail"
            placeholder="Product detail"
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
          />
          <label htmlFor="">
            <input
              type="file"
              name="image"
              multiple
              onChange={handleImageChange}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2 border outline-none"
            />
          </label>
          <button
            // disabled={isLoading}
            className="bg-black p-2 rounded w-full mt-3 text-white"
          >
            {addLoading ? "Loading..." : "Add product"}
          </button>
        </form>
      </div>

      <div className="mt-4 flex flex-wrap gap-1 [&>*:nth-child(1)]:bg-black [&>*:nth-child(1)]:text-white">
        {product.map((p) => (
          <div key={p._id} className="order-id bg-white p-1 shadow-lg gap-5">
            <h2>{p.id}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProducts;

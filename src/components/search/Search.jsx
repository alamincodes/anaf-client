import React, { useState } from "react";
import Product from "../products/Product";

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.search.value);
    const search = e.target.search.value;
    if (search.length === 0) {
      return;
    }
    setIsLoading(true);
    const url = `https://anaf-server.vercel.app/search?search=${search}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSearchData(data);
        setIsLoading(false);
      });
  };

  return (
    <section className="myContainer bg-white rounded-xl mt-2 shadow-cardShadow p-5">
      <div>
        <form onSubmit={handleSubmit} className="flex relative">
          <input
            type="text"
            name="search"
            className=" bg-[#F5F5F5] w-full py-3 px-4 outline-none rounded"
            placeholder="Search products...."
          />
          <button
            type="submit"
            className="absolute right-0 bottom-0 top-0 bg-neutral-800 text-white p-2 px-4 rounded-r-md"
          >
            {isLoading ? (
              <div className="flex justify-center item-center">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </div>
      {searchData.length === 0 && (
        <h3 className=" flex justify-center items-center h-[400px] text-2xl font-bold">
          {" "}
          No products
        </h3>
      )}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 mt-5">
        {searchData.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default Search;

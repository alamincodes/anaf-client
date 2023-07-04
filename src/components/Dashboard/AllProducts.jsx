import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    const searchText = e.target.search.value;
    setSearch(searchText);
    if (search.length === 0) {
      return;
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const url = `https://anaf-server.vercel.app/search?search=${search}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchData(data);
        setIsLoading(false);
      });
  }, [search]);
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex mt-3 relative">
        <input
          type="text"
          name="search"
          className="border border-black/40 focus:border-black w-full p-2 outline-none rounded-md"
          placeholder="Search products...."
        />
        <button
          type="submit"
          className="absolute right-0 bottom-0 top-0 bg-black text-white p-2 px-4 rounded-r-md"
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

      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-4 mt-3">
        {searchData.map((product) => (
          <div
            key={product._id}
            className="relative border rounded-md border-gray-100 bg-white shadow"
          >
            <div className="flex flex-col ">
              <Link to={`/dashboard/${product._id}`}>
                <div className="relative flex justify-center items-center ">
                  <img
                    loading="lazy"
                    className="lg:w-[100%] md:w-[250px] w-[150px] object-cover bg-center bg-cover lg:p-5 p-2 lg:rounded-3xl rounded-xl mb-4"
                    src={product.img}
                    alt="product image"
                  />
                </div>

                <div className="lg:mb-20 lg:mt-auto mt-24  md:px-5 px-2">
                  <div className="absolute bottom-2">
                    <h5 className="md:text-[15px] text-xs tracking-tight text-slate-900">
                      {product.name.length > 50
                        ? product.name.substr(0, 40) + "..."
                        : product.name}
                    </h5>
                    <div className="mt-5">
                      <p>
                        <span className="md:text-xl text-lg font-bold text-slate-900">
                          TK.{product.price}
                        </span>
                        {/* <span className="text-sm text-slate-900 line-through">
              ${price}
            </span> */}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

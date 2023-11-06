import React from "react";

const SearchPayment = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const trxID = e.target.trxID.value;
    const searchData = {
      trxID,
    };
    console.log(trxID);
    fetch("https://anaf-server.vercel.app/payment/bkash/search", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(searchData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>trxID</h3>
          <input type="text" name="trxID" id="" />
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
};

export default SearchPayment;

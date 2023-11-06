const useFavorite = (product, email) => {
  const favItemInfo = { email, product, };
  fetch("https://anaf-server.vercel.app/add-favorite-product", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(favItemInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    
    });
};

export default useFavorite;

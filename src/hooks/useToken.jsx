import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      const url = `https://anaf-server.vercel.app/jwt?email=${email}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};
export default useToken;

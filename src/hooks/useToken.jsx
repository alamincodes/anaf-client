import { useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "../context/AuthProvider";

const useToken = (email) => {
  const { logOut } = useContext(AUTH_CONTEXT);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      const url = `http://localhost:5000/jwt?email=${email}`;
      fetch(url)
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("accessToken");
            return logOut();
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          if (data.accessToken) {
            // console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};
export default useToken;

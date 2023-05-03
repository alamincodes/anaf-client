import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - ANAF`;
  }, [title]);
};
export default useTitle;

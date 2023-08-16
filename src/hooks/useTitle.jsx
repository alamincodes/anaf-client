import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = ` ANAF | ${title}`;
  }, [title]);
};
export default useTitle;

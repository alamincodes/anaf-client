import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `ANAF SHOP | ${title}`;
  }, [title]);
};
export default useTitle;

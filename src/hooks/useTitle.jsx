import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | ANAF SHOP`;
  }, [title]);
};
export default useTitle;

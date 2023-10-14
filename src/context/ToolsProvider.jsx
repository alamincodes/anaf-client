import React, { createContext,  useState } from "react";

export const TOOLS_PROVIDER = createContext();
const ToolsProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  

  const testMes = {
    openMenu,
    setOpenMenu,
  };
  return (
    <TOOLS_PROVIDER.Provider value={testMes}>
      {children}
    </TOOLS_PROVIDER.Provider>
  );
};

export default ToolsProvider;

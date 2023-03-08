import React, { useState, useEffect } from "react";

export const BrowserContext = React.createContext();

export default function BrowserContextProvider({ children }) {
  const [x, setX] = useState(document.documentElement.clientWidth);
  const [y, setY] = useState(document.documentElement.clientHeight);

  useEffect(() => {
    const handleResize = () => {
      setX(document.documentElement.clientWidth);
      setY(document.documentElement.clientHeight);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };

    // TODO: Add debounce
  });


  return (
    <BrowserContext.Provider
      value={{
        x, setX,
        y, setY
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
};

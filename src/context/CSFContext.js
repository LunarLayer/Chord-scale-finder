import React, { useState, useEffect } from "react";

export const CSFContext = React.createContext();

export default function CSFContextProvider({ children }) {
  // Window
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

  // Toolbar
  const [sliderChanged, setSliderChanged] = useState(false);

  // Fretboard
  

  // Display



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(document.documentElement.clientWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { 
      window.removeEventListener('resize', handleResize); 
    };
    // TODO: Add debounce
  }, []);


  return (
    <CSFContext.Provider
      value={{
        // Window
        windowWidth, setWindowWidth,

        // Toolbar
        sliderChanged, setSliderChanged,

        // Fretboard
      }}
    >
      {children}
    </CSFContext.Provider>
  );
};

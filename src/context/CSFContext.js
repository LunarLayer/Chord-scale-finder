import React, { useState, useEffect} from "react";

export const CSFContext = React.createContext();

export default function CSFContextProvider({ children }) {

  // Window
  const [displayView, setDisplayView] = useState("fretboard");
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  // Toolbar
  const [sliderChanged, setSliderChanged] = useState(false);

  // Fretboard
  let gap = ""
  let padding = "";
  let noteMinWidth = 20;
  let noteMaxWidth = 45;
  initValues();

  const [coloredNotes, setColoredNotes] = useState(false);
  const [preferredFretCount, setPreferredFretCount] = useState();
  const [fretCap, setFretCap] = useState(getFretCap());
  const [fretCount, setFretCount] = useState(getFretCount());


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(document.documentElement.clientWidth);
      updateFrets(document.documentElement.clientWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { 
      window.removeEventListener('resize', handleResize); 
    };
  });

  function getFretCount() {
    let newFretCount = (Math.floor(((windowWidth - (padding * 2)) + gap) / (noteMaxWidth + gap))) + 1;
    if (windowWidth < 600) {
      return 12;
    } else if (newFretCount > fretCap) return fretCap;
    return newFretCount;
  }

  function getFretCap() {
    let fretCap = (Math.floor(((windowWidth - (padding * 2)) + gap) / (noteMinWidth + gap))) - 1;
    if (fretCap > 24) return 24;
    return fretCap;
  }

  function getWindowWidth() {
    return document.documentElement.clientWidth;
  }


  function updateFrets(windowWidth) {
    // Initialize optimal values
    let newFretCap = (Math.floor(((windowWidth - (padding * 2)) + gap) / (noteMinWidth + gap))) - 1;
    let newFretCount = (Math.floor(((windowWidth - (padding * 2)) + gap) / (noteMaxWidth + gap))) + 1;
    if (newFretCap > 24) newFretCap = 24;
    if (newFretCount > fretCap) newFretCount = fretCap;
    setFretCap(newFretCap);

    if (sliderChanged) {
      if (fretCount > newFretCap) {
        setFretCount(newFretCap)
        setFretCap(newFretCap)
      } else if (fretCount < preferredFretCount) {
        newFretCap > preferredFretCount ? setFretCount(preferredFretCount) : setFretCount(newFretCap)
      } 
    } else setFretCount(newFretCount)
  }

  function initValues() {
    if (windowWidth <= 600) {
      padding = 5;
      gap = 4;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      padding = 15;
      gap = 6;
    } else {
      padding = 20;
      gap = 8;
    }
  }

  return (
    <CSFContext.Provider
      value={{
        // Window
        displayView, setDisplayView,
        windowWidth, setWindowWidth,

        // Toolbar
        sliderChanged, setSliderChanged,
        
        // Fretboard
        coloredNotes, setColoredNotes,
        fretCount, setFretCount,
        fretCap, setFretCap,
        preferredFretCount, setPreferredFretCount,
        getFretCount, getFretCap,
      }}
    >
      {children}
    </CSFContext.Provider>
  );
};

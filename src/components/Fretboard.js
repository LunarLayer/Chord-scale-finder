import React, { useContext, useEffect } from 'react';

import './Fretboard.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import String from './String';

const Fretboard = () => {
  console.log("Fretboard.js");
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);

  let gap = "";
  let padding = "";
  let fretsCap = "";
  let noteMinWidth = 20;
  let noteMaxWidth = 45;
  
  useEffect(() => {
    initValues();
    adaptFontSize();
    csf.setFretsCap(fretsCap);

    if (csf.sliderChanged) {
      if (music.fretCount > fretsCap) music.setFretCount(fretsCap)
    } else {
      let optimalFrets = (Math.floor(((csf.windowWidth - padding) + gap) / (noteMaxWidth + gap))) + 1;
      if (csf.windowWidth < 600) optimalFrets = 12
      optimalFrets > fretsCap ? music.setFretCount(fretsCap) : music.setFretCount(optimalFrets);
    }
  })
  

  function initValues() {
    if (csf.windowWidth <= 600) {
      // padding = 10;
      gap = 4;
    }
    if (csf.windowWidth > 600 && csf.windowWidth <= 900) {
      // padding = 10;
      gap = 6;
    }
    if (csf.windowWidth > 900) {
      // padding = 10;
      gap = 8;
    }

    // Set fretsCap
    fretsCap = (Math.floor(((csf.windowWidth - padding) + gap) / (noteMinWidth + gap))) - 1;
    if (fretsCap > 24) fretsCap = 24; // cap
  }

  function adaptFontSize() {
    let notes = document.getElementsByClassName('note');
    let fretboard = document.getElementById('fretboard');
    // let fretNumbers = document.getElementById('fretNumbers');
    if (notes[0]) {
      let width = notes[0].offsetWidth;
      if (width === 45) {
        fretboard.style.fontSize = "25px";
        // fretNumbers.style.fontSize = "15px";
      } else {
        let size = width / 2;
        fretboard.style.fontSize = size + "px";
        // fretNumbers.style.fontSize = (size - 5) + "px";
      }
    }
  }
  
  
  return (
    <>
      <div id='fretboard'>
        {/* <div id='fretNumbers'>
          {fretNumbers.map(num => {
            return <p key={"fretNum_" + num}>{num}</p>
          })}
        </div> */}
        {/* make fretnumbers for invisiNotes as well */}
        {music.strings.map(string => {
          return <String key={"string_" + string.number} index={string.number} firstNote={string.note}></String>
        })}
      </div>
    </>
  );
};

export default Fretboard;
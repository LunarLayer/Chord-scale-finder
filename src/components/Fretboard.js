import React, { useContext, useEffect, useRef } from 'react';

import './Fretboard.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import String from './String';

const Fretboard = () => {
  console.log("Fretboard.js");
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);

  const firstRender = useRef(true);

  let gap = ""
  let padding = "";
  let noteMinWidth = 20;
  let noteMaxWidth = 45;
  let fretNumbers = [];
  let hiddenFretNumbers = [];

  initValues();
  initFretNumbers();
  
  
  useEffect(() => {
    console.log("adapting");
    adaptFontSize();
    
    // Triggers:
    // sliderchanged
    // windowWidth

    if (firstRender.current) {
      console.log("first render");
      firstRender.current = false;
      return;
    } else {
      let fretCap = (Math.floor(((csf.windowWidth - (padding * 2)) + gap) / (noteMinWidth + gap))) - 1;
      if (fretCap > 24) fretCap = 24;
      if (music.fretCount > fretCap) {
        console.log("music.fretCount > fretCap");
        console.log("music.fretCount: " + music.fretCount);
        console.log("music.fretCap: " + music.fretCap);
        music.setFretCap(fretCap)
        music.setFretCount(fretCap)
      } else {
        console.log("music.setFretCap(fretCap)");
        console.log("music.fretCount: " + music.fretCount);
        console.log("music.fretCap: " + music.fretCap);
        music.setFretCap(fretCap);
      }
    }
    
    // adaptFontSize();
  


    
  }, [csf, gap, music, noteMinWidth, padding]);
  
  // initFretNumbering();

  function initValues() {
    if (csf.windowWidth <= 600) {
      padding = 5;
      gap = 4;
    } else if (csf.windowWidth > 600 && csf.windowWidth <= 900) {
      padding = 15;
      gap = 6;
    } else {
      padding = 20;
      gap = 8;
    }
  }


  // function adaptInvisibleNotes() {
  //   let notes = document.getElementsByClassName('note');
  //   console.log("adaptInvisibleNotes()");
  //   if (notes[0]) {
  //     let noteWidth = notes[0].getBoundingClientRect().width;
  //     console.log("XXXnoteWidth: " + noteWidth);
  //     let invisibleNotes = document.getElementsByClassName('invisibleNotes');
  //     let remainingFrets = 24 - music.fretCount;
  //     let gap = 8;
  //     if (csf.windowWidth <= 600) gap = 4;
  //     if (csf.windowWidth > 600 && csf.windowWidth <= 900) gap = 6;
  //     let res = (remainingFrets * noteWidth) + ((remainingFrets - 1) * gap);
  //     console.log("remainingFrets: " + remainingFrets);
  //     console.log("noteWidth: " + noteWidth);
  //     console.log("gap: " + gap);
  //     console.log("res: " + res);

  //     for (let invNotes of invisibleNotes) {
  //       invNotes.style.minWidth = res + "px";
  //       invNotes.style.maxWidth = res + "px";
  //     }
  //   }
  // }

 

  function initFretNumbers() {
    for (let i = 0; i <= music.fretCount; i++) { fretNumbers.push(i); }
    for (let i = music.fretCount + 1; i <= 24; i++) { hiddenFretNumbers.push(i); }
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
          return (
            <String 
              key={"string_" + string.number} 
              index={string.number} 
              firstNote={string.note} 
            ></String>
          )
        })}
      </div>
    </>
  );
};

export default Fretboard;
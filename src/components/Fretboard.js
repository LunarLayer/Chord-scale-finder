import React, { useContext, useEffect } from 'react';

import './Fretboard.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import String from './String';

const Fretboard = () => {
  console.log("fretboard.js");
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);

  let fretboard = "";
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let fretNumbers = [];
  let hiddenFretNumbers = [];


  initFretNumbers();
  
  useEffect(() => {
    adaptFontSize();
  });
  

  


  function initFretNumbers() {
    for (let i = 0; i <= csf.fretCount; i++) { fretNumbers.push(i); }
    for (let i = csf.fretCount + 1; i <= 24; i++) { hiddenFretNumbers.push(i); }
  }

  function adaptFontSize() {
    let notes = document.getElementsByClassName('note');
    let fretboard = document.getElementById('fretboard');
    let fretNumbers = document.getElementById('fretNumbers');
    if (notes[0]) {
      let width = notes[0].offsetWidth;
      if (width === 45) {
        fretboard.style.fontSize = "25px";
        fretNumbers.style.fontSize = "15px";
      } else {
        let size = width / 2;
        fretboard.style.fontSize = size + "px";
        fretNumbers.style.fontSize = (size - 5) + "px";
      }
    }
  }


  
  
  return (
    <>
      <div id='fretboard'>
        <div id='fretNumbers'>
          {fretNumbers.map(num => {
            return <p key={"fretNum_" + num} className="fretnumber">{num}</p>
          })}
        </div>
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



  // Save for later. Bugging in chrome, works fine in firefox

    // Still scrolling in hard snaps instead of softly.
    // overflow: auto;
    // overscroll-behavior-x: contain;
    // scroll-snap-type: x mandatory;
    // scrollbar-width: 0;
  
    // &::-webkit-scrollbar {
    //   height: 0;  /* Remove scrollbar space */
    //   background: transparent;  /* Optional: just make scrollbar invisible */
    // }

     // .note {
    //   scroll-snap-align: start;
    // }

  // Scroll handling
  // function initFretboardScroll() {
  //   fretboard = document.getElementById('fretboard');
  //   fretboard.addEventListener('mousedown', mouseDownHandler);
  // }
  // const mouseDownHandler = function (e) {
  //   pos = {
  //     left: fretboard.scrollLeft,
  //     x: e.clientX,
  //   };
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   document.addEventListener('mouseup', mouseUpHandler);
  // };
  // const mouseMoveHandler = function (e) {
  //   const dx = e.clientX - pos.x;
  //   fretboard.scrollLeft = pos.left - dx;
  // };
  // const mouseUpHandler = function () {
  //   document.removeEventListener('mousemove', mouseMoveHandler);
  //   document.removeEventListener('mouseup', mouseUpHandler);
  // };



import React, { useContext, useEffect } from 'react';

import './Fretboard.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import String from './String';

const Fretboard = () => {
console.log("Fretboard.js");
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);
  
  let fretboard = "";
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let fretnumbers = [];
  let invisibleFretnumbers = [];
  
  console.log("before initFretNumbers");
  console.log(fretnumbers);
  initFretNumbers();
  console.log("after initFretNumbers");
  console.log(fretnumbers);
  
  useEffect(() => {
    adaptFontSize();
    initFretboardScroll();
    fixBrowserRounding();

    
  });
  
  function fixBrowserRounding() {
    let root = document.documentElement;
    root.style.setProperty('--note_width', 45);
    let notes = document.getElementsByClassName('note');
    let noteWidth = Math.floor(notes[0].getBoundingClientRect().width);
    root.style.setProperty('--note_width', noteWidth);
  }

  function initFretNumbers() {
    
    for (let i = 0; i <= csf.fretCount; i++) { fretnumbers.push(i); }
    for (let i = parseInt(csf.fretCount) + 1; i <= 24; i++) { invisibleFretnumbers.push(i); }
  }

  function adaptFontSize() {
    let notes = document.getElementsByClassName('note');
    let fretboard = document.getElementById('fretboard');
    let fretnumbers = document.getElementsByClassName('fretnumbers');
    if (notes[0]) {
      let width = notes[0].offsetWidth;
      if (width === 45) {
        fretboard.style.fontSize = "25px";
        for (let fn of fretnumbers) {
          fn.style.fontSize = "15px";
        }
      } else {
        let size = width / 2;
        fretboard.style.fontSize = size + "px";
        for (let fn of fretnumbers) {
          fn.style.fontSize = (size - 5) + "px";
        }
      }
    }
  }

  function initFretboardScroll() {
    const mouseDownHandler = function (e) {
      pos = {
        left: fretboard.scrollLeft,
        x: e.clientX,
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
  
    const mouseMoveHandler = function (e) {
      const dx = e.clientX - pos.x;
      fretboard.scrollLeft = pos.left - dx;
    };
    
    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    fretboard = document.getElementById('fretboard');
    fretboard.addEventListener('mousedown', mouseDownHandler);
  }

  
  return (
    <>
      <div id='fretboard'>
        <div className='fretnumbers'>
          {fretnumbers.map(num => {
            return <p key={"fretNum_" + num} className="fretnumber">{num}</p>
          })}
          <div className='invisible'>
            {invisibleFretnumbers.map(num => {
              return <p key={"fretNum_" + num} className="fretnumber">{num}</p>
            })}
          </div>
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

   

  // Scroll handling
 


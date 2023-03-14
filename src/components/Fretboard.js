import React, { useContext, useEffect } from 'react';

import './Fretboard.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import String from './String';

const Fretboard = () => {

  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);

  let gap = "";
  let padding = "";

  let fretboard = "";
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let fretNumbers = [];
  let hiddenFretNumbers = [];

  initValues();
  initFretNumbers();
  
  useEffect(() => {
    adaptFontSize();
    initFretboardScroll();
    fixBrowserRounding();
  });
  
  function fixBrowserRounding() {
    // let fretboard = document.getElementById('fretboard');
    // let fretCount = csf.getFretCount();
    // console.log(fretCount);


    // // Round down the notewidth to an integer
    // let note = document.getElementsByClassName('note')[0];
    // let roundedNote = Math.floor(note.getBoundingClientRect().width);

    // // what's the total width of the string now? fretboard needs to be that
    // let stringWidth = ((roundedNote * (fretCount + 1)) + (gap * (fretCount)));
    
    // // Set fretboard to that
    // fretboard.style.width = parseInt(stringWidth) + "px";
    





    // let fretCount = csf.getFretCount();
    // console.log("fretCount: " + fretCount);
    // let fretboard = document.getElementById('fretboard');
    // let noteWidth = Math.floor(note.getBoundingClientRect().width);

    // console.log("noteWidth: " + noteWidth);
    // console.log(fretCount);

    // // let windowWidth = csf.windowWidth - (padding * 2);
    // let newFretboardWidth = ((noteWidth * (fretCount + 1)) + (gap * (fretCount)));
    // console.log(gap);
    // console.log(newFretboardWidth);
  
    // console.log(res);
    // fretboard.style.marginLeft = parseInt(res) + "px";
    // fretboard.style.marginRight = parseInt(res) + "px";
    // console.log("windowWidth: " + windowWidth);
    // console.log("newFretboardidth: " + newFretboardWidth);
    // fretboard.style.width = newFretboardWidth + "px";
    // fretboard.style.width = fretboardWidth + "px";
    // fretboard.style.border = 
    // let noteWidth = document.getElementsByClassName('note')[0].getBoundingClientRect().width;
    // console.log(noteWidth);
    // fretboard = document.getElementById('fretboard');
    // let total = ((notes * noteWidth)) + ((notes - 1) * gap);
    // let res = total + 5;
    // console.log(total);
    // fretboard.style.maxWidth = res;
    // console.log(note.getBoundingClientRect().width);
    // console.log(notes);
    // // let note = notes[0];
    // let noteWidth = note.getBoundingClientRect().width;
    // console.log(noteWidth);
    // let totalLength = ((notes.length / 4) * noteWidth) + ((notes.length - 1) * gap);
    // console.log(totalLength);
  }

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

   function initFretboardScroll() {
    fretboard = document.getElementById('fretboard');
    fretboard.addEventListener('mousedown', mouseDownHandler);
  }
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

   

  // Scroll handling
 


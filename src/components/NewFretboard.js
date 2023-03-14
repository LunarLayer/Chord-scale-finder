import React, { useContext, useEffect } from 'react';

import './NewFretboard.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import String from './String';

const Fretboard = () => {
  const music = useContext(MusicContext);
  // const csf = useContext(CSFContext);

  let fretNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  
  useEffect(() => {
    // adaptFontSize();
  });

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
        <div className='fretnumbers'>
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
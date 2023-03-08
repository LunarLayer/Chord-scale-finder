import React, { useContext, useEffect } from 'react';

import './FretboardSettings.scss';
import { MusicContext } from '../context/MusicContext';

import String from './String';

const FretboardSettings = () => {
  const music = useContext(MusicContext);
  let notes = document.getElementsByClassName('note');

  useEffect(() => {
    const handleResize = () => {
      let fretboard = document.getElementById('fretboardSettings');
      let width = notes[0].offsetWidth;

      if (width === 45) {
        fretboard.style.fontSize = "25px";
      } else {
        let size = width / 2;
        fretboard.style.fontSize = size + "px";
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };

    // TODO: Limit frets on smaller screen (maybe add debounce)
  });

  function addString(pos) {
    console.log("addString(): " + pos);
  }

  return (
    <>
      <div id='fretboardSettings'>
        <div className='row'>
          <button onClick={addString(() => music.strings.length + 1)}></button>
          <String firstNote="C"></String>
        </div>
        {music.strings.map(string => {
          return <String context="remove" key={"string_" + string.number} index={string.number} firstNote={string.note} />
        })}
        <String context="add" index={"addBottom"} firstNote="B" />
      </div>
    </>
  );
};

export default FretboardSettings;

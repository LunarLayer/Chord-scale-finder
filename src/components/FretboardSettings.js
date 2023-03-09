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

    // TODO: (maybe add debounce)
  });

  function toggleColoredNotes() {
    if (music.coloredNotes) {
      music.setColoredNotes(false);
    } else {
      music.setColoredNotes(true);
    }
  }

  return (
    <>
      <div id='fretboardSettings'>
        <div className='strings'>
          <String type="add" index={parseInt(music.strings.length) + 1}/>
          {music.strings.map(string => {
            return <String key={"string_" + string.number} index={string.number} firstNote={string.note} type="remove"/>
          })}
          <String type="add" index={0}/>
        </div>
        <div className='settings'>
          <button onClick={() => toggleColoredNotes()}>Colored notes</button>
          <button>Tuning</button>
        </div>
      </div>
    </>
  );
};

export default FretboardSettings;

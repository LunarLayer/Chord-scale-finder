import React, { useContext } from 'react';

import './Toolbar.scss';
import { MusicContext } from '../context/MusicContext';

import Slider from './Slider';

const Toolbar = () => {
  const music = useContext(MusicContext);

  return (
    <div id='toolbar'>

      <div className='key-change'>
        <h3>Key</h3>
        <button
          className={`${music.displayView === "keyChange" ? 'selected' : ''}`}
          onClick={() => {
            if (music.displayView === "keyChange") {
              music.setDisplayView('fretboard')
            } else {
              music.setDisplayView('keyChange')
            }
          }
          }>{music.tonality.note + " " + music.tonality.scale}
        </button>
      </div>

      <div className='fretboard-settings'>
        <h3>Fretboard</h3>
        <button
          className={`${music.displayView === "fretboardSettings" ? 'selected' : ''}`}
          onClick={() => {
            if (music.displayView === "fretboardSettings") {
              music.setDisplayView('fretboard')
            } else {
              music.setDisplayView('fretboardSettings')
            }
          }
          }>Settings
        </button>
      </div>

      <div className={`notes-clear ${music.displayView !== "fretboard" ? 'disabled' : ''}`}>
        <h3>Notes</h3>
        <button>Clear</button>
      </div>

      <Slider />

    </div>
  );
};

export default Toolbar;

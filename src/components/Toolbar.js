import React, { useContext } from 'react';

import './Toolbar.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import Slider from './Slider';

const Toolbar = () => {
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);

  return (
    <div id='toolbar'>

      <div className='key-change'>
        <h3>Key</h3>
        <button
          className={`${csf.displayView === "keyChange" ? 'selected' : ''}`}
          onClick={() => {
            if (csf.displayView === "keyChange") {
              csf.setDisplayView('fretboard')
            } else {
              csf.setDisplayView('keyChange')
            }
          }
          }>{music.tonality.note + " " + music.tonality.scale}
        </button>
      </div>

      <div className='fretboard-settings'>
        <h3>Fretboard</h3>
        <button
          className={`${csf.displayView === "fretboardSettings" ? 'selected' : ''}`}
          onClick={() => {
            if (csf.displayView === "fretboardSettings") {
              csf.setDisplayView('fretboard')
            } else {
              csf.setDisplayView('fretboardSettings')
            }
          }
          }>Settings
        </button>
      </div>

      <div className={`notes-clear ${csf.displayView !== "fretboard" ? 'disabled' : ''}`}>
        <h3>Notes</h3>
        <button>Clear</button>
      </div>

      <Slider />

    </div>
  );
};

export default Toolbar;

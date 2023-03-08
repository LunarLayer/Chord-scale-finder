import React, { useContext, useState, useEffect } from 'react';

import './Toolbar.scss';
import { MusicContext } from '../context/MusicContext';
import { BrowserContext } from '../context/BrowserContext';

const Toolbar = () => {
  const [sliderChanged, setSliderChanged] = useState(false);
  const music = useContext(MusicContext);
  const browser = useContext(BrowserContext);
  const slider = React.createRef();

  let sliderMax = getSliderMax();
  let sliderValue = music.fretCount;

  // TODO: Maxwidth is set to 1 too high at a certain point under 600 width. You are tasked with the mission of finding the sinner. Go!

  useEffect(() => {
    let noteMaxWidth = 45;
    let padding = 20;
    let notesGap = "";
    browser.x <= 600 ? notesGap = 2 : notesGap = 5;
    if (browser.x <= 600) {
      music.setFretCount(12);
    } else {
      if (sliderChanged) {
        music.setFretCount(sliderValue)
      } else {
        let res = (Math.floor((browser.x - padding - (music.fretCount * notesGap - notesGap)) / noteMaxWidth)) + 1;
        if (res > 24) res = 24;
        music.setFretCount(res);
      }
    }
  }, [browser.x]);

  if (sliderValue > sliderMax) sliderValue = sliderMax;

  function getSliderMax() {
    let max = "";
    let padding = "";
    let notesGap = "";
    let noteMinWidth = 20;
    browser.x <= 600 ? padding = 10 : padding = 20;
    browser.x <= 600 ? notesGap = 2 : notesGap = 5;
    max = (Math.floor((browser.x - padding - (music.fretCount * notesGap - notesGap)) / noteMinWidth)) - 1;
    console.log(music.fretCount);
    if (max >= 24) max = 24;
    console.log("getSliderMax: " + max);
    return max;
  }
  
  function sliderMoved() {
    sliderValue = slider.current.value;
    setSliderChanged(true);
    music.setFretCount(slider.current.value);
  }
  // console.log("useEffect sliderValue: " + sliderValue);
  console.log("useEffect sliderMax: " + sliderMax);
  return (
    <div className='toolbar'>

      <div className='key-change'>
        <h3>Key</h3>
        <button
          className={music.displayView === "keyChange" ? 'selected' : ''}
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
          className={music.displayView === "fretboardSettings" ? 'selected' : ''}
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

      <div className={`notes-clear${music.displayView !== "fretboard" ? ' disabled' : ''}`}>
        <h3>Notes</h3>
        <button>Clear</button>
      </div>

      <div className={`frets-slider${music.displayView !== "fretboard" ? ' disabled' : ''}`}>
        <h3>Frets: {sliderValue === "-1" ? 'none' : sliderValue}</h3>
        <div className='slider'>
          <input
            ref={slider}
            type="range"
            value={sliderValue > sliderMax ? sliderMax : sliderValue}
            min="-1"
            max={sliderMax}
            onChange={sliderMoved}
            disabled={`${music.displayView !== "fretboard" ? ' disabled' : ''}`}
          />
        </div>
      </div>

    </div>
  );
};

export default Toolbar;

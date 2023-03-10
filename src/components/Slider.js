// TODO: All the logic that handles adding frets 
// on resize should probably be given to fretboard.
// Putting "sliderChanged, setSliderChanged" in the app 
// and giving it out from there to avoid using context for it.

import React, { useEffect, useState, useContext } from 'react';

import './Slider.scss';
import { MusicContext } from '../context/MusicContext';
import { BrowserContext } from '../context/BrowserContext';

const Slider = ({ clicked }) => {
  const music = useContext(MusicContext);
  const browser = useContext(BrowserContext);

  const [sliderChanged, setSliderChanged] = useState(false);
  const slider = React.createRef();
  let notesGap =  getNotesGap();
 
  let sliderMax = getSliderMax();
  let sliderValue = music.fretCount;

  useEffect(() => {
    let noteMaxWidth = 45;
    let padding = 20;
    if (sliderChanged) {
      music.setFretCount(sliderValue);
    } else if (browser.x <= 600) {
      music.setFretCount(12);
    } else {
      let res = (Math.floor(((browser.x - padding) + notesGap) / (noteMaxWidth + notesGap))) + 1;
      if (res > 24) res = 24;
      music.setFretCount(res);
    }
  });

  if (sliderValue > sliderMax) sliderValue = sliderMax;

  function getNotesGap() {
    if (browser.x <= 600) return 4;
    if (browser.x > 600 && browser.x <= 900) return 6;
    if (browser.x > 900) return 8;
  }

  function getSliderMax() {
    let max = "";
    let padding = "";
    let noteMinWidth = 20;
    browser.x <= 600 ? padding = 10 : padding = 20;
    max = (Math.floor(((browser.x - padding) + notesGap) / (noteMinWidth + notesGap))) - 1;
    if (max > 24) max = 24;
    return max;
  }

  function sliderMoved() {
    sliderValue = slider.current.value;
    setSliderChanged(true);
    music.setDisplayView('fretboard');
    music.setFretCount(slider.current.value);
  }

  return (
    <>
      <div className={`frets-slider`}>
        <h3>Frets: {sliderValue === "-1" ? 'none' : sliderValue}</h3>
        <div className={`slider`}>
          <input
            ref={slider}
            type="range"
            value={sliderValue > sliderMax ? sliderMax : sliderValue}
            min="-1"
            max={sliderMax}
            onChange={sliderMoved}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;

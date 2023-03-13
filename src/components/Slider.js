import React, { useContext } from 'react';

import './Slider.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

const Slider = ({ max }) => {
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);

  const slider = React.createRef();

  function handleChange() {
    csf.setSliderChanged(true);
    music.setDisplayView('fretboard')
    music.setFretCount(slider.current.value);
  }

  return (
    <>
      <div className={`frets-slider`}>
        <h3>Frets: {music.fretCount}</h3>
        <div className={`slider`}>
          <input
            ref={slider}
            type="range"
            value={music.fretCount}
            min="-1"
            max={music.fretCap}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
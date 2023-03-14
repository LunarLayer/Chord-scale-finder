import React, { useContext } from 'react';

import './Slider.scss';
import { CSFContext } from '../context/CSFContext';

const Slider = () => {
  // console.log("slider.js");
  const csf = useContext(CSFContext);

  const slider = React.createRef();

  function handleChange() {
    csf.setPreferredFretCount(slider.current.value)
    csf.setSliderChanged(true);
    csf.setFretCount(slider.current.value);
    csf.setDisplayView('fretboard')
  }

  return (
    <>
      <div className={`frets-slider`}>
        <h3>Frets: {csf.fretCount}</h3>
        <div className={`slider`}>
          <input
            ref={slider}
            type="range"
            value={csf.fretCount}
            min="-1"
            max={csf.fretCap}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
import React, { useState, useContext } from 'react';

import './KeyChange.scss';
import { MusicContext } from '../context/MusicContext';

const KeyChange = () => {
  const music = useContext(MusicContext);
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedScale, setSelectedScale] = useState("");

  function setScale(scale) {
    setSelectedScale(scale);
    music.setTonality({ ...music.tonality, scale: scale });
    if (selectedNote) music.setDisplayView('fretboard')
  }

  function setNote(note) {
    setSelectedNote(note);
    music.setTonality({ ...music.tonality, note: note });
    if (selectedScale) music.setDisplayView('fretboard')
  }

  

  return (
    <>
      <div className='keyChange'>
        <div className='keySelect'>
          <div className='black-keys'>
            <div className={`note sharp ${selectedNote === 'C#' ? 'selected' : ''}`} onClick={() => setNote("C#")}>C</div>
            <div className={`note sharp ${selectedNote === 'D#' ? 'selected' : ''}`} onClick={() => setNote("D#")}>D</div>
            <div className='note hidden'></div>
            <div className={`note sharp ${selectedNote === 'F#' ? 'selected' : ''}`} onClick={() => setNote("F#")}>F</div>
            <div className={`note sharp ${selectedNote === 'G#' ? 'selected' : ''}`} onClick={() => setNote("G#")}>G</div>
            <div className={`note sharp ${selectedNote === 'A#' ? 'selected' : ''}`} onClick={() => setNote("A#")}>A</div>
          </div>
          <div className='white-keys'>
            <div className={`note ${selectedNote === 'C' ? 'selected' : ''}`} onClick={() => setNote("C")}>C</div>
            <div className={`note ${selectedNote === 'D' ? 'selected' : ''}`} onClick={() => setNote("D")}>D</div>
            <div className={`note ${selectedNote === 'E' ? 'selected' : ''}`} onClick={() => setNote("E")}>E</div>
            <div className={`note ${selectedNote === 'F' ? 'selected' : ''}`} onClick={() => setNote("F")}>F</div>
            <div className={`note ${selectedNote === 'G' ? 'selected' : ''}`} onClick={() => setNote("G")}>G</div>
            <div className={`note ${selectedNote === 'A' ? 'selected' : ''}`} onClick={() => setNote("A")}>A</div>
            <div className={`note ${selectedNote === 'B' ? 'selected' : ''}`} onClick={() => setNote("B")}>B</div>
          </div>
        </div>

        <div className='scaleSelect'>
          <button
            className={`major ${selectedScale === 'major' ? 'selected' : ''}`}
            onClick={() => setScale("major")}>Major
          </button>
          <button
            className={`minor ${selectedScale === 'minor' ? 'selected' : ''}`}
            onClick={() => setScale("minor")}>Minor
          </button>
          <button className='done' onClick={() => music.setDisplayView('fretboard')}>Done</button>
        </div>
      </div>
    </>
  );
};

export default KeyChange;

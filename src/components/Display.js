import React, { useContext } from 'react';

import './Display.scss';
import { MusicContext } from '../context/MusicContext';

import Fretboard from './Fretboard';
import FretboardSettings from './FretboardSettings';
import KeyChange from './KeyChange';

function RenderView({ view }) {
  if (view === "fretboard") return <Fretboard />
  if (view === "fretboardSettings") return <FretboardSettings />
  if (view === "keyChange") return <KeyChange />
}

const Display = () => {
  const music = useContext(MusicContext);
  return (
    <RenderView view={music.displayView} />
  );
};

export default Display;

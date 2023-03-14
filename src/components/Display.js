import React, { useContext } from 'react';

import { CSFContext } from '../context/CSFContext';

import Fretboard from './Fretboard';
import FretboardSettings from './FretboardSettings';
import KeyChange from './KeyChange';

function RenderView({ view }) {
  if (view === "fretboard") return <Fretboard />
  if (view === "fretboardSettings") return <FretboardSettings />
  if (view === "keyChange") return <KeyChange />
}

// console.log("display.js");

const Display = () => {
  const csf = useContext(CSFContext);
  return (
    <RenderView view={csf.displayView} />
  );
};

export default Display;

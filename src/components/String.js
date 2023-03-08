import React, { useContext } from 'react';

import './String.scss';
import { MusicContext } from '../context/MusicContext';

import Note from './Note';

const String = ({index, firstNote}) => {
  const music = useContext(MusicContext);

  // Generate notes for the string
  var notes = [];
  var pointer = "";
  var offset = music.notes.findIndex((note) => note.name === firstNote);

  for (let i = 0; i < parseInt(music.fretCount) + 1; i++) { 
    pointer = (i + offset) % music.notes.length;
    notes.push(music.notes[pointer]);
  }

  return ( 
    <div id={"string_" + index} className={`string`}>
      {notes.map((note, index) => {
        return <Note key={"note_" + index} note={note.name}></Note>
      })}
    </div>
  )
};

export default String;

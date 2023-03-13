import React, { useContext, useEffect } from 'react';

import './String.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import Note from './Note';

const String = ({ index, firstNote, type }) => {
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext);

  let pointer = "";
  let offset = music.notes.findIndex((note) => note.name === firstNote);
  let notes = [];
  let invisibleNotes = [];

  useEffect(() => {
    console.log("string.js");
    
  }, [])

  for (let i = 0; i < parseInt(csf.fretCount) + 1; i++) {
    pointer = (offset++) % music.notes.length;
    notes.push(music.notes[pointer]);
  }
  // for (let i = 0; i < parseInt(csf.fretCap) - csf.fretCount; i++) {
  //   pointer = (i + offset) % music.notes.length;
  //   invisibleNotes.push(music.notes[pointer]);
  // }

  return (
    <div id={"string_" + index} className={`string`}>
      {notes.map((note, index) => {
        return <Note key={"note_" + index} note={note.name}></Note>
      })}
      {/* <div className='invisibleNotes string'>
        {invisibleNotes.map((note, index) => {
          return <Note key={"note_" + index} note={note.name}></Note>
        })}
      </div> */}
    </div>
  );
}

  export default String;

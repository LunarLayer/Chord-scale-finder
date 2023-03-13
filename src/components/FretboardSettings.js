import React, { useContext, useEffect } from 'react';

import './FretboardSettings.scss';
import { MusicContext } from '../context/MusicContext';
import { CSFContext } from '../context/CSFContext';

import Note from './Note';

// When to save:
// color changed
// displayView changed

const FretboardSettings = () => {
  const music = useContext(MusicContext);
  const csf = useContext(CSFContext); 
  let existingNotes = document.getElementsByClassName('note');

  useEffect(() => {
    adaptFontSize();
  })

  function adaptFontSize() {
    let fretboard = document.getElementById('fretboardSettings');
    let width = existingNotes[0].offsetWidth;

    if (width === 45) {
      fretboard.style.fontSize = "25px";
    } else {
      let size = width / 2;
      fretboard.style.fontSize = size + "px";
    }
  }

  function toggleColoredNotes() {
    csf.coloredNotes ? csf.setColoredNotes(false) : csf.setColoredNotes(true);
  }

  const AddString = ({pos}) => {
    return (
      <div className={`string add ${pos}`}>
        <Note note="+"></Note>
        {music.notes.map((note, index) => {
          return <Note key={"note_" + index} note={note.name}></Note>
        })}
      </div>
    )
  }

  const RemoveString = ({startNote, index}) => {
    let notes = [];
    let offset = music.notes.findIndex((note) => note.name === startNote);
    for (let i = 0; i < 12; i++) {
      let pointer = (i + offset) % music.notes.length;
      notes.push(music.notes[pointer]);
    }
    return (
      <div className={`string remove ${index}`}>
        <Note note="-"></Note>
        {notes.map((note, index) => {
          return <Note key={"note_" + index} note={note.name}></Note>
        })}
      </div>
    )
  }

  
  return (
    <>
      <div id='fretboardSettings'>
        <div className='strings'>

          <AddString pos={"top"}/>

          {music.strings.map((string) => {
            return <RemoveString key={"string_" + string.number} startNote={string.note} index={string.number}/>
          })}
          
          <AddString pos={"bottom"}/>

        </div>
        <div className='settings'>
          <button onClick={() => toggleColoredNotes()}>Colored notes</button>
          <button>Tuning</button>
        </div>
      </div>
    </>
  );
};

export default FretboardSettings;

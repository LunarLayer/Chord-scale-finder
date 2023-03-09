import React, { useContext } from 'react';

import './String.scss';
import { MusicContext } from '../context/MusicContext';

import Note from './Note';

const String = ({ index, firstNote, type }) => {
  const music = useContext(MusicContext);

  let notes = [];
  let pointer = "";
  let offset = music.notes.findIndex((note) => note.name === firstNote);

  switch (type) {
    case "add":
      return (
        <div className={`string add`}>
          <Note note="+"></Note>
          {music.notes.map((note, index) => {
            return <Note key={"note_" + index} note={note.name}></Note>
          })}
        </div>
      )
    case "remove":
      for (let i = 0; i < 12; i++) {
        pointer = (i + offset) % music.notes.length;
        notes.push(music.notes[pointer]);
      }
      return (
        <div className={`string remove`}>
          <Note note="-"></Note>
          {notes.map((note, index) => {
            return <Note key={"note_" + index} note={note.name}></Note>
          })}
        </div>
      )
    default:
      for (let i = 0; i < parseInt(music.fretCount) + 1; i++) {
        pointer = (i + offset) % music.notes.length;
        notes.push(music.notes[pointer]);
      }
      return (
        <div id={"string_" + index} className={`string normal`}>
          {notes.map((note, index) => {
            return <Note key={"note_" + index} note={note.name}></Note>
          })}
          {/* <div className='invisiNotes string normal'>
            <Note note={"X"}></Note>
            <Note note={"X"}></Note>
            <Note note={"X"}></Note>
            <Note note={"X"}></Note>
            <Note note={"X"}></Note>
            <Note note={"X"}></Note>
            <Note note={"X"}></Note>
            <Note note={"X"}></Note>
          </div> */}
        </div>
      )
  }
};

export default String;

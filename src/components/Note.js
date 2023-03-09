import React, { useContext } from 'react';

import './Note.scss';

import { MusicContext } from '../context/MusicContext';

const Note = ({ note, border, hidden }) => {
  const music = useContext(MusicContext);
  const classList = ["note"];

  if (note.length > 1) classList.push("sharp");
  if (music.coloredNotes) classList.push("colored");

  return (
    <div className={classList.join(" ")} data-note={note}>
      {note.substring(0, 1)}
    </div>
  )
};

export default Note;

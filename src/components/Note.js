import React, { useContext } from 'react';

import './Note.scss';

import { CSFContext } from '../context/CSFContext';

const Note = ({ note, border, hidden }) => {
  const csf = useContext(CSFContext);
  const classList = ["note"];

  if (note.length > 1) classList.push("sharp");
  if (csf.coloredNotes) classList.push("colored");

  return (
    <div className={classList.join(" ")} data-note={note}>
      {note.substring(0, 1)}
    </div>
  )
};

export default Note;

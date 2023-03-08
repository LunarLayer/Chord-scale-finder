import React from 'react';

import './Note.scss';

const Note = ({ note, color, border, hidden }) => {
  const classList = ["note"];

  if (note.length > 1) classList.push("sharp");

  return (
    <div className={classList.join(" ")}>
      {note.substring(0, 1)}
    </div>
  )
};

export default Note;

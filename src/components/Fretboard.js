import React, { useContext, useEffect } from 'react';

import './Fretboard.scss';
import { MusicContext } from '../context/MusicContext';
import { BrowserContext } from '../context/BrowserContext';

import String from './String';

const Fretboard = () => {
  const music = useContext(MusicContext);
  const browser = useContext(BrowserContext);
  
  const ele = document.getElementById('fretboard');
  const fretNumbers = [];
  let notes = "";
  for (let i = 0; i <= music.fretCount; i++) { fretNumbers.push(i); }

  console.log("fretboardloaded");
  // YOOOOOOOOOOOOOOOOOO
  // InivisiNotes*tm are not exactly same size as other notes. probably some lacking decimal stuff

  // Scroll functionality
  const mouseDownHandler = function (e) {
    pos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  if (ele) {
    ele.addEventListener('mousedown', mouseDownHandler);
  }
  // if (ele) ele.addEventListener('mousedown', mouseDownHandler);

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
  };
  //
  useEffect(() => {
    notes = document.getElementsByClassName('note');
 
  // set width på alle invisinote
  })

  function adaptFontSize() {
    // notes = document.getElementsByClassName('note');
    let fretboard = document.getElementById('fretboard');
    let fretNumbers = document.getElementById('fretNumbers');
    if (notes[0]) {
      let width = notes[0].offsetWidth;
      
      if (width === 45) {
        fretboard.style.fontSize = "25px";
        fretNumbers.style.fontSize = "15px";
      } else {
        let size = width / 2;
        fretboard.style.fontSize = size + "px";
        fretNumbers.style.fontSize = (size - 5) + "px";
      }
    }
  }

  function adaptInvisibleNotes() {
    // notes = document.getElementsByClassName('note');
    console.log("adaptInvisibleNotes()");
    if (notes[0]) {
      let noteWidth = notes[0].getBoundingClientRect().width;
      console.log("XXXnoteWidth: " + noteWidth);
      let invisiNotes = document.getElementsByClassName('invisiNotes');
      let remainingFrets = 24 - music.fretCount;
      let gap = 8;
      if (browser.x <= 600) gap = 4;
      if (browser.x > 600 && browser.x <= 900) gap = 6;
      let res = (remainingFrets * noteWidth) + ((remainingFrets - 1) * gap);
      console.log("remainingFrets: " + remainingFrets);
      console.log("noteWidth: " + noteWidth);
      console.log("gap: " + gap);
      console.log("res: " + res);

      for (let invNotes of invisiNotes) {
        invNotes.style.minWidth = res + "px";
        invNotes.style.maxWidth = res + "px";
      }
    }
  }

  useEffect(() => {
    
    const handleResize = () => {
      adaptFontSize();
      adaptInvisibleNotes();
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
    // TODO: (maybe add debounce)
  });

  // generate array of noteIndexes
  // 
  
  
  
  return (
    <>
      <div id='fretboard'>
        <div id='fretNumbers'>
          {fretNumbers.map(num => {
            return <p key={"fretNum_" + num}>{num}</p>
          })}
        </div>
        {/* make fretnumbers for invisiNotes as well */}
        {music.strings.map(string => {
          return <String key={"string_" + string.number} index={string.number} firstNote={string.note}></String>
        })}
      </div>
    </>
  );
};

export default Fretboard;


















// const String = ({index, startNote}) => {
//   var notes = [];
//   var offset = music.notes.findIndex((x) => x.name === startNote);

//   for (let i = 0; i < parseInt(music.fretCount) + 1; i++) {
//     var pointer = (i + offset) % music.notes.length;
//     notes.push(music.notes[pointer]);
//   }
  
//   return ( 
//     <div id={"string_" + index} className={`string`}>
//       {notes.map((note, index) => {
//         return <Note key={"note_" + index} note={note.name}></Note>
//       })}
//     </div>
//   )
// }

// import React, { useContext } from 'react';

// import './Fretboard.scss';

// import { MusicContext } from '../../../context/MusicContext';
// // import FretsSlider from '../fretsSlider/FretsSlider';

// const Fretboard = ({settings}) => {
//   const music = useContext(MusicContext);

//   const String = ({index, startNote}) => {
//     var notes = [];
//     var offset = music.notes.findIndex((x) => x.name === startNote);

//     for (let i = 0; i < music.fretCount; i++) {
//       var pointer = (i + offset) % music.notes.length;
//       notes.push(music.notes[pointer]);
//     }
    
//     return ( 
//       <div id={"string_" + index} className={`string`}>
//         {notes.map((note, index) => {
//           if (note.name.includes('#')) {
//             return (
//               <button 
//               id={index.toString() + '_' + index.toString()} 
//               key={index} 
//               className={`${note.name} note sharp ${index === 0 ? "selected" : ''}`}>
//                 {note.name[0]}
//               </button>
//             )
//           } else {
//             return (
//               <button 
//               id={index.toString() + '_' + index.toString()} 
//               key={index} 
//               className={`${note.name} note ${index === 0 ? "selected" : ''}`}>
//                 {note.name}
//               </button>
//             )
//           }
//         })}
//       </div>
//     )
//   }

//   const RenderStrings = () => {
//     return (
//       <div className='strings'>
//         {music.strings.map((string) => {
//           return (
//             <String 
//               key={'string_' + string.number} 
//               index={string.number} 
//               startNote={string.note}
//             />
//           )
//         })}
//       </div>
//     )
//   }

//   return (
//     <div className='fretboard'>
//       <RenderStrings/>
//     </div>
//   )
// };

// export default Fretboard;





// // Set a new tuning: 
// // let tempStrings = music.strings;
// // let idx = stringIndex - 1;
// // let newString = tempStrings[idx];
// // newString.note = noteName;
// // tempStrings[idx] = newString;
// // music.setStrings(tempStrings);
import React, { useContext, useEffect } from 'react';

import './Fretboard.scss';
import { MusicContext } from '../context/MusicContext';

import String from './String';

const Fretboard = () => {
  const music = useContext(MusicContext);
  let notes = document.getElementsByClassName('note');
  let fretNumbers = [];
  for (let i = 0; i <= music.fretCount; i++) {
    fretNumbers.push(i);
  }

  useEffect(() => {
    const handleResize = () => {
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
            console.log(num);
            return <p key={"fretNum_" + num}>{num}</p>
          })}
        </div>
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
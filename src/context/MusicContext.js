import React, { useState, useContext } from "react";

export const MusicContext = React.createContext();

export default function MusicContextProvider({ children }) {
  
  const [tonality, setTonality] = useState({ note: "C", scale: "Major" });
  
  const [strings, setStrings] = useState([
    { number: 4, note: "G" },
    { number: 3, note: "D" },
    { number: 2, note: "A" },
    { number: 1, note: "E" },
  ]);
  const addString = ({ topOrBottom, stringNote }) => {
    switch (topOrBottom) {
      case "top":
        strings.forEach((string, index) => {
          string.number++;
        });
        setStrings([{ number: 1, note: stringNote }, ...strings]);
        break
      case "bottom":
        setStrings([...strings, { number: (strings.length + 1), note: stringNote }]);
        break
      default:
        break;
    }
  }
  const removeString = (index) => {
    var newArr = strings.filter((string) => string.number !== index);
    newArr.forEach((string, index) => { string.number = (index + 1) })
    setStrings(newArr);
  };

  const majorChords = {
    major: { type: "Major", name: "maj", interval: ["1", "3", "5"] },
    major6: "Major 6th",
    major69: "Major 6/9",
    major7: "Major 7th",
    major9: "Major 9th",
    major11: "Major 11th",
    major13: "Major 13th"
  };
  const minorChords = {
    minor: { type: "Minor", name: "min", interval: ["1", "b3", "5"] },
  }
  // {major6: "Major 6th"},
  // {major69: "Major 6/9"},
  // {major7: "Major 7th"},
  // {major9: "Major 9th"},
  // {major11: "Major 11th"},
  // {major13: "Major 13th"},
  // {minor: "Minor"},
  // {minor6: "Minor 6th"},
  // {minor7: "Minor 7th"},
  // {minor9: "Minor 9th"},
  // {minor11: "Minor 11th"},
  // {minor13: "Minor 13th"},
  // {minormajor7: "Minor Major 7th"},
  // {dominant7: "Dominant 7"},
  // {dominant9: "Dominant 9"},
  // {dominant11: "Dominant 11"},
  // {dominant13: "Dominant 13"},
  // {diminished: "Diminished"},
  // {diminished7: "Diminished 7"},
  // {halfdiminished: "Half Diminshed"},
  // {augmented: "Augmented"},
  // {augmented7: "Augmented 7"},
  // {sus2: "Sus 2"},
  // {sus4: "Sus 4"},
  // {sevensus4: "7 Sus 4"}, // can't 7sus4
  // {add9: "Add9"},
  // {add11: "Add11"},


  const notes = [
    { name: "C",  color: "white", alternateName: [null] },
    { name: "C#", color: "black", alternateName: ["Db"] },
    { name: "D",  color: "white", alternateName: [null] },
    { name: "D#", color: "black", alternateName: ["Eb"] },
    { name: "E",  color: "white", alternateName: [null] },
    { name: "F",  color: "white", alternateName: [null] },
    { name: "F#", color: "black", alternateName: ["Gb"] },
    { name: "G",  color: "white", alternateName: [null] },
    { name: "G#", color: "black", alternateName: ["Db"] },
    { name: "A",  color: "white", alternateName: [null] },
    { name: "A#", color: "black", alternateName: ["Db"] },
    { name: "B",  color: "white", alternateName: [null] }
  ];




  return (
    <MusicContext.Provider
      value={{
        notes,
        majorChords, minorChords,
        strings, setStrings,
        tonality, setTonality,
        addString, removeString,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

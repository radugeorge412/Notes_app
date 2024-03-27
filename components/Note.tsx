import React from "react";
import { Note } from "../pages/index";

const Note = ({ handleSelectNote, handleDeleteNote, note }: Props) => {
  return (
    <>
      <div
        className="note-item"
        key={note.id}
        onClick={() => handleSelectNote(note)}
      >
        <div className="notes-header">
          <button onClick={(e) => handleDeleteNote(e, note.id)}>x</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </>
  );
};

type Props = {
  handleSelectNote: (note: Note) => void;
  handleDeleteNote: (e: React.MouseEvent, id: number) => void;
  note: Note;
};
export default Note;

import React from "react";
import { Note } from "../pages/index";

const Form = ({
  selectedNote,
  handleUpdateNote,
  setContent,
  setTitle,
  title,
  content,
  handleAddNote,
  handleCancel,
}: Props) => {
  return (
    <div>
      <form
        className="note-form"
        onSubmit={(e) =>
          selectedNote ? handleUpdateNote(e) : handleAddNote(e)
        }
      >
        <input
          placeholder="title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <textarea
          placeholder="Content"
          rows={10}
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
    </div>
  );
};

type Props = {
  selectedNote: Note | null;
  handleUpdateNote: (e: React.FormEvent<HTMLFormElement>) => void;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  title: string;
  content: string;
  handleAddNote: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
};

export default Form;

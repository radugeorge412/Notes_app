"use client";
import "./Page.css";
import Form from "@/components/Form";
import React, { useState, useEffect } from "react";
import Note from "@/components/Note";

export default function Home() {
  const [notes, setNotes] = useState<NoteType[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes");
        const notes: NoteType[] = await res.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };
    getNotes();
  }, []);

  const handleAddNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const newNote = await res.json();
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectNote = async (note: NoteType) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedNote(note);
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: content,
          }),
        }
      );

      const updatedNote = await res.json();
      console.log(updatedNote);

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );
      console.log(updatedNotesList);

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleDeleteNote = async (e: React.FormEvent, noteId: number) => {
    e.stopPropagation();

    try {
      await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "DELETE",
      });
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      setNotes(updatedNotes);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app-container">
      <Form
        selectedNote={selectedNote}
        handleUpdateNote={handleUpdateNote}
        setContent={setContent}
        setTitle={setTitle}
        title={title}
        content={content}
        handleAddNote={handleAddNote}
        handleCancel={handleCancel}
      />
      <div className="notes-grid">
        {notes.map((note) => (
          <Note
            key={note.id}
            handleDeleteNote={handleDeleteNote}
            handleSelectNote={handleSelectNote}
            note={note}
          />
        ))}
      </div>
    </div>
  );
}

export type NoteType = {
  id: number;
  title: string;
  content: string;
};

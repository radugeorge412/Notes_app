"use client";
import "./Page.css";
import Form from "@/components/Form";
import React, { useState, useEffect } from "react";
import Note from "@/components/Note";

export default function Home({ initialNotes }: { initialNotes: NoteType[] }) {
  const [notes, setNotes] = useState<NoteType[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(process.env.REACT_APP_PORT);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

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
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/notes/${selectedNote.id}`,
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
      await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
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

export async function getServerSideProps() {
  let notes = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/notes`
    );
    notes = await res.json();
  } catch (error) {
    console.error("Failed to fetch notes:", error);
  }
  return { props: { initialNotes: notes } };
}

export type NoteType = {
  id: number;
  title: string;
  content: string;
};

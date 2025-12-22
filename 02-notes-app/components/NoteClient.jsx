"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
const NoteClient = ({ initialNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(initialNotes || []);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (result.success) {
        setNotes((prev) => [result.note, ...prev]);
        setTitle("");
        setContent("");
        toast.success("Note created successfully 🦁");
      } else {
        toast.error(result.message || "Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note 📝");
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`/api/deleteNote/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
        toast.success("Note deleted successfully 🗑️");
      } else {
        toast.error(result.message || "Failed to delete note");
      }
    } catch (error) {
      return toast.error("Failed to delete note 🗑️");
    }
  };

  const updateHandler = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error("Title and content are required");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`/api/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      const result = await response.json();

      if (result.success) {
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? result.note : note))
        );
        setEditId(null);
        setEditTitle("");
        setEditContent("");
        toast.success("Note updated successfully 🦁");
      } else {
        toast.error(result.message || "Failed to update note");
      }
      setLoading(false);
    } catch (error) {
      return toast.error("Failed to update note 📝");
    }
  };

  const startEditing = async (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };
  const cancleEditing = async (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-md ">
        <h2 className="text-xl text-gray-800 font-semibold mb-4 ">
          Create New Note
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            placeholder="Content"
            className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400">
            {loading ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        <h2 className="">Your notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="text-gray-400">No notes available.</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
              {editId === note._id ? (
                <>
                {/* // Edit Mode */}
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={5}
                    required
                    className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateHandler(note._id)}
                      disabled={loading}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                      {loading ? "Updating..." : "Update Note"}
                    </button>
                    <button
                      onClick={cancleEditing}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Cancel
                    </button>
                  </div>
                </div>
                </>
              ) : (
               
                <>
                 {/* // View Mode */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {note.title}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(note)}
                        className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHandler(note._id)}
                        className="text-red-500 hover:text-red-700 text-sm cursor-pointer">
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-[11px] text-gray-700">
                    Created : {new Date(note.createdAt).toLocaleString()}
                  </p>
                  {note.updatedAt !== note.createdAt && (
                    <p className="text-[11px] text-gray-700">
                      Updated : {new Date(note.updatedAt).toLocaleString()}
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteClient;

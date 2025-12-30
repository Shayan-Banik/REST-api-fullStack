import NoteClient from "@/components/NoteClient.jsx";
import { connectToDatabase } from "@/lib/db";
import { Note } from "@/models/note.model.js";

async function getNotes() {
  await connectToDatabase();
  const notes = await Note.find().sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
  }));
}


export default async function Home() {
  const notes = await getNotes();
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Notes App</h1>
        <div>
          <NoteClient  initialNotes={notes} />
          {/* <CopyNote databaseNotes ={notes}/> */}
        </div>
      </div>
    </main>
  );
}

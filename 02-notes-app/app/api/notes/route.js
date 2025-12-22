import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { Note } from "@/models/note.model";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const newNote = await Note.create(body);

    return NextResponse.json(
      { message: "Note created successfully 🦁", note: newNote, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create note 📝", error: error.message },
      { status: 500 }
    );
  }
}

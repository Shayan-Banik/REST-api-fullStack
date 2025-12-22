import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { Note } from "@/models/note.model";

export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Fetch all notes", success: true, notes: notes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notes", error: error.message },
      { status: 500 }
    );
  }
}

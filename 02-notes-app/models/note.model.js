import mongoose  from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  content: {
    type: String,
    required: true,
    maxLength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// middlewaare
NoteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
});

export const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

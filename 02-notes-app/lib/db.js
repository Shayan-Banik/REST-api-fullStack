import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to the database.");
    // console.log("Connected to the database.", db);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

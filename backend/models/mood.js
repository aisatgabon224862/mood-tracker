import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  section: { type: String, required: true },
  grade: { type: String, required: true },
  emotion: { type: String, required: true },
  explanation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const mood = mongoose.model("Mood", moodSchema);
export default mood;

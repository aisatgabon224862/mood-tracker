import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  name: { type: String, required: false },
  section: { type: String, required: true },
  grade: { type: String, required: true },
  emotion: { type: String, required: true },
  explanation: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;

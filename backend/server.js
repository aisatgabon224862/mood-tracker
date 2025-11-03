import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// --- 1 Connect to MongoDB ---
mongoose
  .connect(
    "mongodb+srv://aisatgabon224862_db_user:vdYIs7nGKeLxd592@cluster0.ra5a5zd.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.log(" MongoDB error:", err));

// --- 2 Define Schema (data structure) ---
const MoodSchema = new mongoose.Schema({
  name: String,
  section: String,
  mood: String,
  explanation: String,
  date: { type: Date, default: Date.now },
});

const Mood = mongoose.model("Mood", MoodSchema);

// --- 3 Create API Route to receive data ---
app.post("/submit", async (req, res) => {
  try {
    const moodEntry = new Mood(req.body);
    await moodEntry.save();
    res.json({ message: " Mood saved successfully" });
  } catch (error) {
    res.status(500).json({ error: " Failed to save mood" });
  }
});

// --- 4 (Optional) Route to view all submissions (admin use) ---
app.get("/moods", async (req, res) => {
  const moods = await Mood.find();
  res.json(moods);
});

// --- 5 Start Server ---
app.listen(5000, () => console.log(" Server running on port 5000"));

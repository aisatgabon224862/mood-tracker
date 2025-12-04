import express from "express";
import XLSX from "xlsx";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------- Mood Schema -----------------
const moodSchema = new mongoose.Schema({
  name: String,
  mood: String,
  section: String,
  grade: String,
  explanation: String,
  date: { type: Date, default: Date.now },
});
const Mood = mongoose.model("Mood", moodSchema);

// ----------------- Routes -----------------

// Default route
app.get("/", (req, res) => res.send("Server is running"));

// Fetch moods
app.get("/api/moods", async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit mood
app.post("/submit", async (req, res) => {
  try {
    const { name, section, explanation, mood, grade } = req.body;
    if (!name || !section || !explanation || !mood || !grade) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMood = new Mood({ name, section, explanation, grade, mood });
    await newMood.save();
    res.json({ message: "Mood submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete mood
app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Mood.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting entry" });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

// ----------------- Export to Excel -----------------
app.get("/export/excel", async (req, res) => {
  try {
    const { grade, mood } = req.query;
    let filter = {};

    if (grade && grade !== "All") filter.grade = grade;
    if (mood && mood !== "All") filter.mood = mood;

    const data = await Mood.find(filter).lean();

    // Clean MongoDB fields
    const cleanData = data.map(({ _id, __v, ...rest }) => ({
      ...rest,
      date: new Date(rest.date).toLocaleDateString(), // format date nicely
    }));

    // Create Excel workbook
    const ws = XLSX.utils.json_to_sheet(cleanData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Moods");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=moods_report.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating Excel file" });
  }
});

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

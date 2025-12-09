
import express from "express";
import XLSX from "xlsx";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminroutes.js";
import exportRoutes from "./routes/exportRoutes.js"
import Mood from "./models/Mood.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin", exportRoutes);

// Submit mood
app.post("/submit", async (req, res) => {
  const { name, section, explanation, mood: emotion, grade } = req.body;
  if (!name || !section || !explanation || !emotion || !grade) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newMood = new Mood({ name, section, explanation, grade, emotion });
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

// Get moods
app.get("/api/moods", async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ message: "Login successful" });
  }
  return res.status(401).json({ message: "Invalid email or password" });
});

// Default route
app.get("/", (req, res) => res.send("Server is running"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

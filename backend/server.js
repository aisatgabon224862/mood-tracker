import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import adminRoutes from "./routes/adminroutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import Mood from "./models/Mood.js";

dotenv.config();

const app = express();

// ==========================
// MIDDLEWARE
// ==========================

// Global CORS — allows your frontend to access backend
app.use(
  cors({
    origin: "https://mood-tracker-tropical-village-nhs.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight handler
app.options("*", cors());

// Parse JSON bodies
app.use(express.json());

// ==========================
// ROUTES
// ==========================

// Admin routes (login, dashboard, etc.)
app.use("/api/admin", adminRoutes);

// Excel export route
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
    console.error("Submit mood error:", err);
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
    console.error("Delete mood error:", err);
    res.status(500).json({ message: "Error deleting entry" });
  }
});

// Get all moods
app.get("/api/moods", async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (err) {
    console.error("Get moods error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid email or password" });
});

// Default route
app.get("/", (req, res) => res.send("Server is running"));

// ==========================
// DATABASE + SERVER STARTUP
// ==========================

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit process so Render can retry
  }
};

startServer();

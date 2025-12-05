import express from "express";
import XLSX from "xlsx";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminroutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import Mood from "./models/Mood.js";

dotenv.config();

const app = express();

// ✅ Apply CORS before all routes
const allowedOrigins = [
  "https://mood-tracker-tropical-village-nhs.vercel.app",
  "http://localhost:3000",
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle OPTIONS preflight for all routes
app.options("*", cors());

app.use(express.json());

// Admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin", exportRoutes);

// Submit mood, Delete mood, Get moods, Export Excel ...
// (keep your existing routes unchanged)

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

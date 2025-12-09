import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import adminRoutes from "./routes/adminroutes.js";
import exportRoutes from "./routes/exportRoutes.js";

dotenv.config();

const app = express();

// Global CORS — allow frontend
app.use(
  cors({
    origin: "https://mood-tracker-tropical-village-nhs.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle all preflight OPTIONS requests
app.options("*", cors());

// Parse JSON
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin", exportRoutes);

// Default route
app.get("/", (req, res) => res.send("Server is running"));

// DB + Server startup
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

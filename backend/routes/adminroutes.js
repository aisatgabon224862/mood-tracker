import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import Mood from "../models/Mood.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Admin Login
router.delete("/moods/delete-all", auth, async (req, res) => {
  try {
    await Mood.deleteMany({});
    res.json({ message: "All entry deleted succesfully" });
  } catch (err) {
    res.status(500).json({ message: "failed to delete all enrty" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email });

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found in DB");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match result:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "2h" }
    );

    console.log("JWT token generated:", token);

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

import express from "express";
import XLSX from "xlsx";
import Mood from "../models/Mood.js";

const router = express.Router();

// Export Excel
router.get("/export/excel", async (req, res) => {
  try {
    const { grade, mood } = req.query;

    const filter = {};
    if (grade && grade !== "All") filter.grade = grade;
    if (mood && mood !== "All") filter.emotion = mood;

    const data = await Mood.find(filter).lean();

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Moods");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=moods.xlsx");

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to export Excel" });
  }
});

export default router;

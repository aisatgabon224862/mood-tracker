import express from "express";
import XLSX from "xlsx";
import Mood from "../models/Mood.js";

const router = express.Router();

router.get("/export/excel", async (req, res) => {
  try {
    const { grade, mood } = req.query;

    let filter = {};
    if (grade && grade !== "All") filter.grade = grade;
    if (mood && mood !== "All") filter.mood = mood;

    const data = await Mood.find(filter).lean();

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    res.send(buffer);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ message: "Failed to create Excel file" });
  }
});

export default router;

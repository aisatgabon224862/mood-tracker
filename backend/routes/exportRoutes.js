import express from "express";
import XLSX from "xlsx";
import Mood from "../models/Mood.js"; // exact casing + .js

const router = express.Router();

router.get("/export/excel", async (req, res) => {
  try {
    const { grade, mood } = req.query;

    // Build filter
    let filter = {};
    if (grade && grade !== "All") filter.grade = grade;
    if (mood && mood !== "All") filter.emotion = mood; // schema field is emotion

    const data = (await Mood.find(filter).lean()).map(item => ({
      ...item,
      _id: item._id.toString(), // Convert _id to string for Excel
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ message: "Failed to create Excel file" });
  }
});

export default router;

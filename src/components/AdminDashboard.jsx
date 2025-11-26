import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";

const AdminDashboard = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch(
          "https://mood-tracker-5.onrender.com/api/moods"
        );
        const data = await res.json();
        setMoods(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch moods:", error);
      }
    };

    fetchMoods();
  }, []);

  // Group by Grade Level
  const groupByGrade = (items) => {
    const groups = {};
    items.forEach((item) => {
      if (!groups[item.grade]) groups[item.grade] = [];
      groups[item.grade].push(item);
    });
    return groups;
  };

  // Group by Mood within Grade
  const groupByMood = (items) => {
    const moodGroups = {};
    items.forEach((item) => {
      if (!moodGroups[item.mood]) moodGroups[item.mood] = [];
      moodGroups[item.mood].push(item);
    });
    return moodGroups;
  };

  const gradeGroups = groupByGrade(moods);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2 className="fw-bold mx-5">
          <i className="bi bi-person-workspace me-2">Admin Dashboard</i>
        </h2>
        <button className="btn btn-danger" onClick={() => navigate("/admin")}>
          Logout
        </button>
      </div>

      {/* Display Grouped Students */}
      {Object.keys(gradeGroups).map((grade) => {
        const moodGroups = groupByMood(gradeGroups[grade]);
        return (
          <div key={grade} className="mb-4 p-3 border rounded shadow-sm">
            <h3 className="mb-3"> {grade}</h3>
            {Object.keys(moodGroups).map((mood) => (
              <div key={mood} className="mb-3">
                <h5 className="text-success">{mood}</h5>
                <table className="table table-bordered align-middle mb-3">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Section</th>
                      <th>Explanation</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moodGroups[mood].map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.section}</td>
                        <td>{student.explanation}</td>
                        <td>{new Date(student.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AdminDashboard;

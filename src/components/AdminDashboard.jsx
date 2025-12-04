import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");

  // Protect dashboard
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin");
  }, [navigate]);

  // Fetch moods
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch(
          "https://mood-tracker-5.onrender.com/api/moods",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
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

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://mood-tracker-5.onrender.com/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const data = await res.json();
      alert(data.message);
      setMoods((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete entry.");
    }
  };

  // Group by Grade
  const groupByGrade = (items) => {
    const groups = {};
    items.forEach((item) => {
      if (!groups[item.grade]) groups[item.grade] = [];
      groups[item.grade].push(item);
    });
    return groups;
  };

  // Group by Mood
  const groupByMood = (items) => {
    const moodGroups = {};
    items.forEach((item) => {
      if (!moodGroups[item.mood]) moodGroups[item.mood] = [];
      moodGroups[item.mood].push(item);
    });
    return moodGroups;
  };

  // FILTER LOGIC
  const filteredMoods = moods.filter((item) => {
    const gradeMatch = selectedGrade === "All" || item.grade === selectedGrade;
    const moodMatch = selectedMood === "All" || item.mood === selectedMood;
    return gradeMatch && moodMatch;
  });

  const gradeGroups = groupByGrade(filteredMoods);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  // Unique moods for dropdown
  const uniqueMoods = [...new Set(moods.map((item) => item.mood))];
  const uniqueGrades = [...new Set(moods.map((item) => item.grade))];

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-person-workspace me-2 align-items-center"></i>{" "}
          Admin Dashboard
        </h2>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/admin");
          }}
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="d-flex gap-3 mb-4">
        {/* Grade Filter */}
        <select
          className="form-select w-auto"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="All">All Grades</option>
          {uniqueGrades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>

        {/* Mood Filter */}
        <select
          className="form-select w-auto"
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          <option value="All">All Moods</option>
          {uniqueMoods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </div>

      {/* Display Grouped Students */}
      {Object.keys(gradeGroups).map((grade) => {
        const moodGroups = groupByMood(gradeGroups[grade]);
        return (
          <div key={grade} className="mb-4 p-3 border rounded shadow-sm">
            <h3 className="grade">{grade}</h3>
            {Object.keys(moodGroups).map((mood) => (
              <div key={mood} className="mb-3">
                <h5 className="moody_1">{mood}</h5>
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Section</th>
                      <th>Explanation</th>
                      <th>Date</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moodGroups[mood].map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.section}</td>
                        <td>{student.explanation}</td>
                        <td>{new Date(student.date).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="delete-icon-btn"
                            onClick={() => handleDelete(student._id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => {
                    window.location.href =
                      "https://moodtracker-backend.onrender.com/export/excel";
                  }}
                  className="btn btn-success"
                >
                  {" "}
                  ⬇️{" "}
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AdminDashboard;

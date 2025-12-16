import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://mood-tracker-5.onrender.com";

const AdminDashboard = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");
  const isFiltered = selectedGrade !== "All" || selectedMood !== "All";
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin");
  }, [navigate]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/moods`);
        const data = await res.json();
        setMoods(data);
      } catch (err) {
        console.error("Failed to fetch moods:", err);
      }
      setLoading(false);
    };
    fetchMoods();
  }, []);
  const handleDeleteAll = async () => {
    const confirm = window.prompt("Type DELETE ALL to confirm");
    if (confirm !== "DELETE ALL") return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/moods/delete-all`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("All entries deleted successfully");
      setMoods([]);
    } catch (err) {
      alert("Failed to delete all entries");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      setMoods((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete entry.");
    }
  };

  const filteredMoods = moods.filter((item) => {
    const gradeMatch = selectedGrade === "All" || item.grade === selectedGrade;
    const moodMatch = selectedMood === "All" || item.emotion === selectedMood;
    return gradeMatch && moodMatch;
  });

  const groupBy = (items, key) => {
    return items.reduce((acc, item) => {
      acc[item[key]] = acc[item[key]] || [];
      acc[item[key]].push(item);
      return acc;
    }, {});
  };

  const gradeGroups = groupBy(filteredMoods, "grade");

  const uniqueMoods = [...new Set(moods.map((i) => i.emotion))];
  const uniqueGrades = [...new Set(moods.map((i) => i.grade))];

  const handleDownload = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/admin/export/excel?grade=${selectedGrade}&mood=${selectedMood}`
      );

      if (!res.ok) throw new Error("Failed to download");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "moods_report.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Excel download failed.");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <div>
          <button
            disabled={moods.length === 0}
            className="btn btn-outline-danger"
            onClick={handleDeleteAll}
          >
            🗑️ Delete All Records
          </button>{" "}
          <button onClick={handleDownload} className="btn btn-success me-2">
            ⬇️ Download Excel
          </button>
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
      </div>

      {/* FILTER BAR */}
      <div className="d-flex gap-3 mb-4">
        <select
          className="form-select w-auto"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="All">All Grades</option>
          {uniqueGrades.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        <select
          className="form-select w-auto"
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          <option value="All">All Moods</option>
          {uniqueMoods.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      {/* FILTERED (SINGLE TABLE VIEW) */}
      {isFiltered && (
        <div className="dashboard-card">
          <h3 className="grade-title">
            {selectedGrade !== "All" ? selectedGrade : "All Grades"}{" "}
            {selectedMood !== "All" && `• ${selectedMood}`}
          </h3>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade Level</th>
                <th>Mood</th>
                <th>Section</th>
                <th>Explanation</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredMoods.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.grade}</td>
                  <td>{item.emotion}</td>
                  <td>{item.section}</td>
                  <td>{item.explanation}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-delete-icon"
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DISPLAY GROUPED DATA */}
      {!isFiltered &&
        Object.keys(gradeGroups).map((grade) => {
          const moodGroups = groupBy(gradeGroups[grade], "emotion");

          return (
            <div key={grade} className="dashboard-card">
              <h3 className="grade-title">{grade}</h3>

              {Object.keys(moodGroups).map((mood) => (
                <div key={mood} className="mb-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Mood</th>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Explanation</th>
                        <th>Date</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moodGroups[mood].map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{mood}</td>
                          <td>{item.name}</td>
                          <td>{item.section}</td>
                          <td>{item.explanation}</td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="btn-delete-icon"
                              onClick={() => handleDelete(item._id)}
                            >
                              🗑️
                            </button>
                          </td>
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

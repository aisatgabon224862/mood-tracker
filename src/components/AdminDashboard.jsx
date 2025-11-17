import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";

const AdminDashboard = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch("https://mood-tracker-5.onrender.com/api/moods");
        const data = await res.json();
        setMoods(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch moods:", error);
      }
    };

    fetchMoods();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <img src={logo} alt="School Logo" style={{ width: "80px" }} />

        <h1 className="fw-bold text-primary text-center m-0">
          TROPICAL VILLAGE NATIONAL HIGH SCHOOL
        </h1>

        <img src={deped} alt="DepEd Logo" style={{ width: "80px" }} />
      </div>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-person-workspace me-2"></i>Admin Dashboard
        </h2>

        <button className="btn btn-danger" onClick={() => Navigate("/admin")}>
          Logout
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white fw-semibold">
          Student Mood Reports
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Mood</th>
                  <th>Section</th>
                  <th>Explanation</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {moods.length > 0 ? (
                  moods.map((mood) => (
                    <tr key={mood._id}>
                      <td className="fw-medium">{mood.name}</td>

                      <td>{mood.mood}</td>
                      <td>{mood.section}</td>
                      <td>{mood.explanation}</td>
                      <td>{new Date(mood.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No student mood data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

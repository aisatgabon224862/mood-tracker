import { useSearchParams, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";

function MoodForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mood = searchParams.get("mood");
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    explanation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://mood-tracker-5.onrender.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, mood }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <>
      <div className="form-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h2 className="form-title">You are feeling {mood} today</h2>

        <form onSubmit={handleSubmit} className="mood-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Section:
            <input
              type="text"
              name="section"
              placeholder="Enter your section"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Why do you feel this way?
            <textarea
              name="explanation"
              placeholder="Explain your feelings..."
              rows="4"
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <button
            type="submit"
            className="submit-btn"
            onClick={() => navigate("/")}
          >
            Submit
          </button>
        </form>
      </div>
      <footer>
        {" "}
        <p className="header small">
          © {new Date().getFullYear()} Mood Tracker
        </p>{" "}
      </footer>
    </>
  );
}
export default MoodForm;

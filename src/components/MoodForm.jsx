import { useSearchParams, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";
import logos from "../assets/logos.png";
import youtube from "../assets/youtube.png";

function MoodForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // decode emoji from URL
  const mood = searchParams.get("mood") || "";
  const rawEmoji = searchParams.get("emoji") || "";
  const emoji = decodeURIComponent(rawEmoji);

  const [formData, setFormData] = useState({
    name: "",
    section: "",
    explanation: "",
    grade: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.section.trim() ||
      !formData.explanation.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://mood-tracker-5.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, mood }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      alert(data?.message || "Submitted successfully");
      navigate("/");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit. Please check console/network.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center header-row">
        <img src={logo} alt="logo" className="logos mt-1" />
        <h3 className="tropical mb-4">TROPICAL VILLAGE NATIONAL HIGH SCHOOL</h3>
        <img src={deped} alt="deped logo" className="deped" />
      </div>

      {/* Form Wrapper */}
      <div className="form-wrapper">
        <div className="form-container">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>

          <h2 className="form-title">
            You are feeling{" "}
            <span className="mood-highlight">{mood}</span> {emoji} today
          </h2>

          <form onSubmit={handleSubmit} className="mood-form">
            {/* Name */}
            <label>
              Name:
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            {/* Section */}
            <label>
              Section:
              <input
                type="text"
                name="section"
                placeholder="Enter your section"
                value={formData.section}
                onChange={handleChange}
              />
            </label>

            {/* Grade */}
            <label>
              Grade Level:
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              >
                <option value="">Select your grade</option>
                <option value="Grade 12">Grade 12</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 7">Grade 7</option>
              </select>
            </label>

            {/* Explanation */}
            <label>
              Why do you feel this way?
              <textarea
                name="explanation"
                placeholder="Explain your feelings..."
                rows="4"
                value={formData.explanation}
                onChange={handleChange}
              />
            </label>

            {/* Submit */}
            <button
              className="submit-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Footer icons */}
        <footer className="d-flex justify-content-center mt-4 gap-3">
          <a
            href="https://www.facebook.com/DepEdTayoTVNHS301223"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logos} alt="facebook" className="facebook" />
          </a>

          <a
            href="https://www.youtube.com/@tropicalvillagenationalhig5006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="youtube" className="youtube" />
          </a>
        </footer>

        <p className="header small text-center mt-2">
          © {new Date().getFullYear()} Mood Tracker
        </p>
      </div>
    </>
  );
}

export default MoodForm;

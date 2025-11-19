import { useSearchParams, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";
import image from "../assets/images.png";
import youtube from "../assets/youtube.png";

function MoodForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mood = searchParams.get("mood");
  const emoji = searchParams.get("emoji");
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
      <div className="d-flex justify-content-between align-items-center header-row ">
        <img src={logo} alt="logo" className="logos mt-1" />
        <h2 className="tropical mb-5">TROPICAL VILLAGE NATIONAL HIGH SCHOOL</h2>
        <img src={deped} alt="deped logo" className="deped " />
      </div>
      <div className="form-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h2 className="form-title">
          You are feeling {mood} {emoji} today
        </h2>

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
            className="submit-btn"
            type="submit"
            onClick={() => navigate("/")}
          >
            Submit
          </button>
        </form>
      </div>
      <footer className="d-flex justify-content-end mx-5">
        <a
          href="https://www.facebook.com/DepEdTayoTVNHS301223"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={image} alt="facebook" className="facebook m" />
        </a>
        <a
          href="https://www.youtube.com/@tropicalvillagenationalhig5006"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtube} alt="youtube" className="youtube" />
        </a>{" "}
      </footer>
      <p className="header small mx-5 ">
        © {new Date().getFullYear()} Mood Tracker
      </p>{" "}
    </>
  );
}
export default MoodForm;

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

    if (!formData.name.trim() || !formData.section.trim() || !formData.explanation.trim()) {
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
      alert("Failed to submit. Please check the console/network.");
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
            You are feeling <span className="mood-highlight">{mood}</span> {emoji} today
          </h2>

          <form onSubmit={handleSubmit} className="mood-form">
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

            <label>
              Section:
              <input
                type="text"
                name="section"
                placeholder="Enter your section"
                value={formData.section}
                onChange

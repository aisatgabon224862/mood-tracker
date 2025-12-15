import { useSearchParams, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";
import logos from "../assets/logos.png";
import youtube from "../assets/youtube.png";
import { Container } from "postcss";

function MoodForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // decode emoji from URL
  const mood = searchParams.get("mood") || "";
  const rawEmoji = searchParams.get("emoji") || "";
  const emoji = decodeURIComponent(rawEmoji);
  const [showModal, setShowModal] = useState(false);
  const [advice, setAdvice] = useState("");
  const getAdvice = (mood) => {
    switch (mood) {
      case "Happy":
        setAdvice("Keep spreading the positive vibes!");
        break;
      case "Sad":
        setAdvice(
          "Its okay to feel this way, You may talk to your guidance counselor"
        );
        break;
      case "Angry":
        setAdvice("Take a deep breath");
        break;
      case "Tired":
        setAdvice("Dont be guilty to have a rest");
        break;
      case "Excited":
        setAdvice("Wow we feel excited for you");
        break;
      default:
        setAdvice("Dont be scared, God is with you!");
    }
  };
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
  9;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.section.trim()) {
      alert("Please fill in your section.");
      return;
    }
    setAdvice(getAdvice(mood));
    setShowModal(true);
    setSubmitting(true);
    {showModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>💬 A Message for You</h3>
      <p>{advice}</p>

      <div className="modal-actions">
        <button
          className="btn btn-secondary"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
           <button
          className="btn btn-primary"
          onClick={async () => {
            setShowModal(false);
            setSubmitting(true);

            try {
              const response = await fetch(
                "https://mood-tracker-5.onrender.com/submit",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...formData, mood }),
                }
              );

              if (!response.ok) {
                throw new Error(await response.text());
              }

              alert("Thank you for sharing. Your feelings are valid.");
              navigate("/");
            } catch (error) {
              alert("Submit failed. Please check your network.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          OK, Submit
        </button>
      </div>
    </div>
  </div>
)}

    try {
      const response = await fetch(
        "https://mood-tracker-5.onrender.com/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, mood }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      alert("Thank you for sharing, Your feelings are valid.");
      navigate("/");
    } catch (error) {
      console.error("Submit error:", error);
      alert("submit failed, Please check your network ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className=" d-flex justify-content-between align-items-center header-row">
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
            You are feeling <span className="mood-highlight">{mood}</span>{" "}
            {emoji} today
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
            {/* Grade */}
            <label>
              Grade Level:
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              >
                <option value="">Select your grade</option>
                <option value="Grade7">Grade 7</option>
                <option value="Grade8">Grade 8</option>
                <option value="Grade9">Grade 9</option>
                <option value="Grade10">Grade 10</option>
                <option value="Grade11">Grade 11</option>
                <option value="Grade12">Grade 12</option>
              </select>
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
                required
              />
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
            <button className="submit-btn" type="submit" disabled={submitting}>
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
          © {new Date().getFullYear()} Mood Tracker{" "}
        </p>
        <i>developed by:</i> <b>Kurt Gabon</b>
      </div>
    </>
  );
}

export default MoodForm;

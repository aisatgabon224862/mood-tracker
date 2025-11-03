import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😎", label: "Excited" },
  ];

  return (
    <div className="home-container">
      <h1 className="title">How are you feeling today?</h1>
      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className="mood-card"
            onClick={() => navigate(`/form?mood=${mood.label}`)}
          >
            <span className="emoji">{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default Home;

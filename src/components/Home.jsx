import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container text-center mt-5">
      <h1 className="fw-bold text-primary mb-4">How are you feeling today?</h1>

      <div className="row justify-content-center g-4">
        {moods.map((mood) => (
          <div key={mood.label} className="col-6 col-md-2">
            <button
              className="btn btn-light border shadow-sm w-100 py-4 rounded-4"
              onClick={() => navigate(`/form?mood=${mood.label}`)}
              style={{
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="fs-1">{mood.emoji}</div>
              <div className="fw-semibold mt-2">{mood.label}</div>
            </button>
          </div>
        ))}
      </div>

      <footer className="text-muted mt-3 small">
        <p>© {new Date().getFullYear()} Mood Tracker</p>
      </footer>
    </div>
  );
}

export default Home;

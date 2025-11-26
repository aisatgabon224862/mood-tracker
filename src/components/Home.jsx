import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";
import logos from "../assets/logos.png";
import youtube from "../assets/youtube.png";

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
    <>
      <div id="bg" className="d-flex justify-content-between align-items-center header-row">
        <img src={logo} alt="logo" className="logos mt-1" />
        <h2 className="tropical">TROPICAL VILLAGE NATIONAL HIGH SCHOOL</h2>
        <img src={deped} alt="deped logo" className="deped" />
      </div>

      <div className="container text-center py-5">
        <h1 id="feel" className="fw-bold mb-4">
          How are you feeling today?
        </h1>

        <div className="row justify-content-center g-2">
          {moods.map((mood) => (
            <div key={mood.label} className="col-6 col-md-2">
              <button
                className="btn btn-light border shadow-sm w-100 py-4 rounded-4"
                onClick={() =>
                  navigate(`/form?mood=${mood.label}&emoji=${mood.emoji}`)
                }
                style={{ transition: "all 0.3s ease" }}
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

        <p className="d-flex justify-content-center small">
          © {new Date().getFullYear()} Mood Tracker
        </p>

        <footer className="foot-er mb-3">
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
      </div>
    </>
  );
}

export default Home;

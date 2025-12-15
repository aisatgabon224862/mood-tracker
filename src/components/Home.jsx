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
      {/* HEADER */}
      <div className="header-row">
        <img src={logo} alt="logo" className="logos" />
        <h2 className="tropical">TROPICAL VILLAGE NATIONAL HIGH SCHOOL</h2>
        <img src={deped} alt="deped logo" className="deped" />
      </div>

      {/* MAIN */}
      <div className="container text-center py-5 fadeIn">
        <h1 id="feel" className="fw-bold mb-4">
          How are you feeling today?
        </h1>

        <div className="row justify-content-center g-4">
          {moods.map((mood) => (
            <div key={mood.label} className="col-6 col-md-2">
              <button
                className="mood-card"
                onClick={() =>
                  navigate(`/form?mood=${mood.label}&emoji=${mood.emoji}`)
                }
              >
                <div className="emoji">{mood.emoji}</div>
                <div className="mood-label">{mood.label}</div>
              </button>
            </div>
          ))}
        </div>

        <p className="small">© {new Date().getFullYear()} Mood Tracker</p>
        <i>developed by:</i><b> Kurt Gabon</b>

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

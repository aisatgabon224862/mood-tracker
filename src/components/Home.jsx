import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";
import image from "../assets/images.png";
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
      <div className="logo-div">
        {" "}
        <img src={logo} alt="logo" className="logos" />
        <span className="tropical">TROPICAL VILLAGE NATIONAL HIGH SCHOOL</span>
        <img src={deped} alt="deped logo" className="deped" />
      </div>

      <div id="containe" className="container text-center mt-5">
        <h1 id="feel" className="fw-bold mb-4">
          How are you feeling today?
        </h1>

        <div className="row justify-content-center g-4">
          {moods.map((mood) => (
            <div key={mood.label} className="col-6 col-md-2">
              <button
                className="btn btn-light border shadow-sm w-100 py-4 rounded-4"
                onClick={() =>
                  navigate(`/form?mood=${mood.label}&emoji=${mood.emoji}`)
                }
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

        <footer className="foot-er">
          <p>© {new Date().getFullYear()} Mood Tracker</p>
          <a
            href="https://www.facebook.com/DepEdTayoTVNHS301223"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={image} alt="facebook" className="facebook" />
            facebook
          </a>
          <a
            href="https://www.youtube.com/@tropicalvillagenationalhig5006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="youtube" className="youtube" />
            youtube
          </a>
        </footer>
      </div>
    </>
  );
}

export default Home;

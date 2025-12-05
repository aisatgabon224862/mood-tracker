import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home.jsx";
import MoodForm from "./components/MoodForm.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<MoodForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import logo from "../assets/logo.png";
import deped from "../assets/deped.png";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://mood-tracker-5.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("adminToken", data.token);
      window.location.href = "admin/dashboard";
    } else {
      alert("Invalid email or password");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100  mr-3 mx-5">
        {" "}
        <img src={logo} alt="logo" className="logos mt-5" />
        <h5 className="tropical">TROPICAL VILLAGE NATIONAL HIGH SCHOOL</h5>
        <img src={deped} alt="deped logo" className="deped mt-5" />
        <div
          id="Alogin"
          className="card shadow-lg p-4  border-0"
          style={{ width: "500px" }}
        >
          <div className="text-center mb-3">
            <img src={logo} alt="logo" width="80" className="mb-2" />
            <h5 className="fw-bold">TROPICAL VILLAGE NATIONAL HIGH SCHOOL</h5>
            <img src={deped} alt="deped" width="70" className="mt-2" />
          </div>

          <h3 className="text-center text-primary mb-4">Admin Login</h3>

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="form-control mb-3 "
              required
            />

            <div className="input-group mb-3">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                className="form-control"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button className="btn btn-primary w-100 py-2 fw-bold">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;

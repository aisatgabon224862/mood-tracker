import React, { useState } from "react";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://mood-tracker-5.onrender.com//api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
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
      <p className="header small">©{new Date().getFullYear()} Mood Tracker</p>
      <div className=" border border-success-subtle container fw-bold text-primary  mb-4 p-5 m-auto ">
        <h2 className="p-0">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password "
            onChange={handleChange}
            className="form-control mb-1 "
            required
          />
          <button
            className="btn btn-outline-light btn-sm  mb-3 small "
            type="button"
            onClick={() => {
              {
                setShowPassword(!showPassword);
              }
            }}
          >
            {showPassword ? "hide" : "show"}
          </button>
          <br />
          <div class="d-flex justify-content-end">
            <button className="btn btn-info btn-lg  " type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;

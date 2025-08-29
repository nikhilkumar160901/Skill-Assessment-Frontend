import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">
        <h2 className="register-title">Create Account ✨</h2>
        <p className="register-subtitle">Join us and start your journey</p>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="register-input"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          type="email"
          className="register-input"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="register-input"
          required
        />

        <button type="submit" className="register-button">
          Register
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

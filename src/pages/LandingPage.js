import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">Welcome, {user.name}! 🎉</h1>
        <p className="landing-subtitle">
          You are logged in as <strong>{user.role}</strong>
        </p>

        <div className={`cards-grid ${user.role === "admin" ? "admin" : "user"}`}>
          {user.role === "admin" ? (
            <>
              <div className="landing-card-item" onClick={() => navigate("/skills")} style={{ background: "#e0e7ff" }}>
                <h3>📚 Manage Skills</h3>
                <p>Create, edit and delete skills</p>
              </div>
              <div className="landing-card-item" onClick={() => navigate("/questions")} style={{ background: "#f3e8ff" }}>
                <h3>❓ Manage Questions</h3>
                <p>Add and assign quiz questions</p>
              </div>
              <div className="landing-card-item" onClick={() => navigate("/attempts")} style={{ background: "#ffe4e6" }}>
                <h3>📊 View Attempts</h3>
                <p>Track quiz performance</p>
              </div>
            </>
          ) : (
            <>
              <div className="landing-card-item" onClick={() => navigate("/quiz")} style={{ background: "#dcfce7" }}>
                <h3>📝 Take Quiz</h3>
                <p>Test your skills with quizzes</p>
              </div>
              <div className="landing-card-item" onClick={() => navigate("/history")} style={{ background: "#fef9c3" }}>
                <h3>📜 Quiz History</h3>
                <p>Review past attempts & scores</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

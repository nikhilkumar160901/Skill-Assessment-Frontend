import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; 

  return (
    <nav className="navbar">
      
      <div className="navbar-logo" onClick={() => navigate("/")}>
        QuizApp
      </div>

      
      <div className="navbar-right">
        <span className="navbar-user">👤 {user.name}</span>
        <button
          className="navbar-button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

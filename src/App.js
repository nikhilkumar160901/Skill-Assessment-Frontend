import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import HistoryPage from "./pages/HistoryPage";
import Layout from "./components/Layout"; // updated
import ProtectedRoute from "./components/ProtectedRoute";
import Skill from "./pages/Skill";
import ManageQuestionsPage from "./pages/ManageQuestionsPage";
import AdminReportsPage from "./pages/AdminReportsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes with Navbar */}
        <Route
          element={
            <ProtectedRoute>
              <Layout /> {/* Navbar is inside Layout */}
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/skills" element={<Skill />} />
          <Route path="/questions" element={<ManageQuestionsPage />} />
          <Route path="/attempts" element={<AdminReportsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

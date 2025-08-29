import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./History.css";

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await api.get(`/attempts/history`);
        setHistory(res.data);
        console.log("Fetched history:", res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    }

    if (user?.id) fetchHistory();
  }, [user]);

 
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true, 
    });
  };

  return (
    <div className="history-container">
      <h2>📜 Quiz History</h2>

      {history.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Score</th>
              <th>Started</th>
              <th>Finished</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {history.map((attempt) => (
              <tr key={attempt.id}>
                <td>{attempt.skill_name}</td>
                <td>
                  {attempt.total_score} / {attempt.max_score}
                </td>
                <td>{formatDate(attempt.started_at)}</td>
                <td>{formatDate(attempt.finished_at)}</td>
                <td>{attempt.duration_seconds}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

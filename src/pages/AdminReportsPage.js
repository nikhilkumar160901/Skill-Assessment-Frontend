import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./AdminReports.css";

export default function ReportsDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userReports, setUserReports] = useState([]);
  const [skillGap, setSkillGap] = useState([]);
  const [timeReports, setTimeReports] = useState([]);
  const [timeFilter, setTimeFilter] = useState("month");

 
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

 
  useEffect(() => {
    if (!selectedUser) return;
    async function fetchReports() {
      const [userRes, skillRes] = await Promise.all([
        api.get(`/reports/user/${selectedUser}`),
        api.get(`/reports/skill-gap/${selectedUser}`)
      ]);
      setUserReports(userRes.data);
      setSkillGap(skillRes.data);
    }
    fetchReports();
  }, [selectedUser]);

 
  useEffect(() => {
    async function fetchTime() {
      let start, end;
      const now = new Date();
      if (timeFilter === "week") {
        start = new Date(now.setDate(now.getDate() - 7));
      } else {
        start = new Date(now.setMonth(now.getMonth() - 1));
      }
      const res = await api.get("/reports/time-based", {
        params: { start: start.toISOString(), end: new Date().toISOString() }
      });
      setTimeReports(res.data);
    }
    fetchTime();
  }, [timeFilter]);

  return (
    <div className="reports-container">
      <h2>📊 Performance Reports</h2>

      {/* User Dropdown */}
      <label>
        Select User:{" "}
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">-- choose --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </label>

      {/* 1. User-wise Performance */}
      {userReports.length > 0 && (
        <>
          <h3>User Attempts</h3>
          <table>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Score</th>
                <th>Started</th>
                <th>Finished</th>
              </tr>
            </thead>
            <tbody>
              {userReports.map((r) => (
                <tr key={r.attempt_id}>
                  <td>{r.skill}</td>
                  <td>{r.total_score}/{r.max_score}</td>
                  <td>{new Date(r.started_at).toLocaleString()}</td>
                  <td>{new Date(r.finished_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userReports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_score" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {/* 2. Skill Gap */}
      {skillGap.length > 0 && (
        <>
          <h3>Skill Gap (Avg %)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillGap} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="skill" type="category" />
              <Tooltip />
              <Bar dataKey="avg_percent" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {/* 3. Time-based Reports */}
      <div>
        <h3>Time Reports</h3>
        <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
        </select>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeReports}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="avg_percent" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

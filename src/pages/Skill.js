import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Skill.css";

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editing, setEditing] = useState(null); 
  const [editName, setEditName] = useState("");

 
  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const res = await api.get("/skills");
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  }

 
  async function addSkill() {
    if (!newSkill.trim()) return;
    try {
      await api.post("/skills", { name: newSkill });
      setNewSkill("");
      fetchSkills();
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  }


  async function updateSkill(id) {
    if (!editName.trim()) return;
    try {
      await api.put(`/skills/${id}`, { name: editName });
      setEditing(null);
      fetchSkills();
    } catch (err) {
      console.error("Error updating skill:", err);
    }
  }

 
  async function deleteSkill(id) {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  }

  return (
    <div className="admin-skills-container">
      <h2>⚡ Manage Skills</h2>

     
      <div className="add-skill">
        <input
          type="text"
          placeholder="Enter new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button onClick={addSkill}>Add Skill</button>
      </div>

      
      <table className="skills-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Skill Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.id}</td>
              <td>
                {editing === skill.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  skill.name
                )}
              </td>
              <td>
                {editing === skill.id ? (
                  <>
                    <button onClick={() => updateSkill(skill.id)}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditing(skill.id);
                        setEditName(skill.name);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteSkill(skill.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState, useEffect } from "react";
import api from "../api/axios";
import "./ManageQuestions.css";

export default function ManageQuestionsPage() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    points: 1,
    options: [
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ],
  });

 
  useEffect(() => {
    async function fetchSkills() {
      const res = await api.get("/skills");
      setSkills(res.data);
    }
    fetchSkills();
  }, []);


  const fetchQuestions = async (skillId) => {
    if (!skillId) return;
    const res = await api.get(`/questions/skill/${skillId}`);
    setQuestions(res.data);
  };

 
  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { text: "", is_correct: false }],
    });
  };


  const handleOptionChange = (idx, field, value) => {
    const opts = [...newQuestion.options];
    opts[idx][field] = value;
    setNewQuestion({ ...newQuestion, options: opts });
  };

 
  const submitQuestion = async () => {
    if (!selectedSkill) return alert("Please select a skill first");

    try {
      await api.post("/questions", {
        skill_id: selectedSkill,
        question_text: newQuestion.text,
        points: newQuestion.points,
        options: newQuestion.options.map((o) => ({
          option_text: o.text,
          is_correct: o.is_correct,
        })),
      });

      alert("✅ Question added");
      setNewQuestion({
        text: "",
        points: 1,
        options: [
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      });
      fetchQuestions(selectedSkill);
    } catch (err) {
      console.error("Error adding question:", err);
      alert("Failed to add question");
    }
  };

  return (
    <div className="questions-container">
      <h2>⚡ Manage Questions</h2>

      {/* Skill Selector */}
      <div className="skill-select">
        <label>Select Skill: </label>
        <select
          value={selectedSkill}
          onChange={(e) => {
            setSelectedSkill(e.target.value);
            fetchQuestions(e.target.value);
          }}
        >
          <option value="">-- Choose Skill --</option>
          {skills.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Question Form */}
      {selectedSkill && (
        <div className="add-question-form">
          <h3>Add New Question</h3>
          <input
            type="text"
            placeholder="Question text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          />
          <input
            type="number"
            min="1"
            value={newQuestion.points}
            onChange={(e) => setNewQuestion({ ...newQuestion, points: e.target.value })}
          />

          <h4>Options</h4>
          {newQuestion.options.map((opt, idx) => (
            <div key={idx} className="option-input">
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt.text}
                onChange={(e) => handleOptionChange(idx, "text", e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={opt.is_correct}
                  onChange={(e) => handleOptionChange(idx, "is_correct", e.target.checked)}
                />
                Correct
              </label>
            </div>
          ))}
          <button onClick={addOption}>+ Add Option</button>
          <button onClick={submitQuestion} className="submit-btn">
            Save Question
          </button>
        </div>
      )}

      {/* Questions List */}
      {questions.length > 0 && (
        <div className="questions-list">
          <h3>Existing Questions</h3>
          {questions.map((q) => (
            <div key={q.id} className="question-card">
              <p>
                <strong>{q.question_text}</strong> ({q.points} pts)
              </p>
              <ul>
                {q.options.map((opt) => (
                  <li key={opt.id}>{opt.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

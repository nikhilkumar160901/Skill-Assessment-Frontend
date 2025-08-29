import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Quiz.css";

export default function QuizPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [skillId, setSkillId] = useState("");
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [attemptId, setAttemptId] = useState(null);


  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await api.get("/skills");
        setSkills(res.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    }
    fetchSkills();
  }, []);


  const startQuiz = async () => {
    if (!skillId) return alert("Please select a skill");

    try {
      const res = await api.post("/attempts/start", {
        skill_id: skillId,
        user_id: user.id, 
      });
      console.log("Start quiz response:", res.data);

      setAttemptId(res.data.attempt_id);
      setQuestions(res.data.questions || []); 
    } catch (err) {
      console.error("Error starting quiz:", err);
      alert("Failed to start quiz. Check console for details.");
    }
  };

 
  const handleSelect = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };


  const submitQuiz = async () => {
    try {
      const payload = {
        answers: Object.entries(answers).map(([qid, oid]) => ({
          question_id: parseInt(qid),
          selected_option_id: oid,
        })),
      };

      const res = await api.post(`/attempts/${attemptId}/submit`, payload);
      alert(
        `Quiz Submitted ✅ Your Score: ${res.data.total_score}/${res.data.max_score}`
      );
      navigate("/history");
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Failed to submit quiz.");
    }
  };

  return (
    <div className="quiz-container">
      {!attemptId ? (
        <div className="quiz-start">
          <h2>Select a Skill</h2>
          <select value={skillId} onChange={(e) => setSkillId(e.target.value)}>
            <option value="">-- Choose Skill --</option>
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-questions">
          <h2>Answer Questions</h2>
          {questions.map((q, idx) => (
            <div key={q.id} className="question-card">
              <p>
                <strong>Q{idx + 1}:</strong> {q.text}
              </p>
              <ul>
                {q.options.map((opt) => (
                  <li key={opt.id}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === opt.id}
                        onChange={() => handleSelect(q.id, opt.id)}
                      />
                      {opt.option_text /* ✅ fix: backend sends option_text */}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={submitQuiz} className="submit-btn">
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}

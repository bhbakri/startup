import React, { useEffect, useState } from 'react';
import './QuizPage.css';
import { useNavigate } from 'react-router-dom';

export function Quiz() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [message, setMessage] = useState('');
  const [correctIndex, setCorrectIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/leaderboard');
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // e.g., 2025-04-16
    const lastPlayed = localStorage.getItem(`quizDate-${currentUser}`);
    if (lastPlayed === today) {
      navigate('/leaderboard');
    }

    // randomize correct answer
    setCorrectIndex(Math.floor(Math.random() * 4));
  }, [currentUser, navigate]);

  const handleSubmit = () => {
    if (submitted || selectedAnswer === null) return;

    const streaks = JSON.parse(localStorage.getItem("streaks")) || {};
    let currentStreak = streaks[currentUser] || 0;

    const isCorrect = selectedAnswer === correctIndex;

    if (isCorrect) {
      currentStreak += 1;
      setMessage("✅ Correct!");
    } else {
      currentStreak = 0;
      setMessage("❌ Incorrect.");
    }

    streaks[currentUser] = currentStreak;
    localStorage.setItem("streaks", JSON.stringify(streaks));

    // Quiz Done
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`quizDate-${currentUser}`, today);

    setSubmitted(true);

    // Slgiht Delay
    setTimeout(() => navigate('/leaderboard'), 2000);
  };

  const answers = ['Answer A', 'Answer B', 'Answer C', 'Answer D'];

  return (
    <main>
      <h1>{currentUser}</h1>
      <h1>The Daily Question</h1>
      <h2>(Placeholder for random question)</h2>
      <form>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            type="radio"
            name="answer"
            checked={selectedAnswer === index}
            onChange={() => setSelectedAnswer(index)}
            disabled={submitted}
            className="answers"
          />
          <label>
            {answer}
            {index === correctIndex ? ' (Correct)' : ''}
            {submitted && index === selectedAnswer && index !== correctIndex ? ' (Your Pick)' : ''}
          </label>
          <br />
        </div>
      ))}
      </form>
      {message && <h2>{message}</h2>}
      {!submitted && (
        <button onClick={handleSubmit}>Submit Answer</button>
      )}
    </main>
  );
}

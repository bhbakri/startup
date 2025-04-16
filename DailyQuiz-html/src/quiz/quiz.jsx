import React, { useEffect, useState } from 'react';
import './QuizPage.css';
import { useNavigate } from 'react-router-dom';

export function Quiz() {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // First check quiz status
    fetch('/api/quiz/status')
      .then(res => {
        if (res.status === 401) {
          navigate('/leaderboard');
          return;
        }
        return res.json();
      })
      .then(data => {
        if (!data?.canPlay) {
          navigate('/leaderboard');
        } else {
          // Get the question
          fetch('/api/quiz/question')
            .then(res => res.json())
            .then(setQuestionData);
        }
      });
  }, [navigate]);

  const handleSubmit = async () => {
    if (submitted || selectedAnswer === null || !questionData) return;

    const isCorrect = selectedAnswer === questionData.correctIndex;

    try {
      const res = await fetch('/api/streak', { credentials: 'include' });
      const data = await res.json();
      let streak = data.streak;

      streak = isCorrect ? streak + 1 : 0;

      await fetch('/api/streak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ streak }),
      });

      await fetch('/api/quiz/complete', {
        method: 'POST',
        credentials: 'include'
      });

      setMessage(isCorrect ? '✅ Correct!' : '❌ Incorrect.');
      setSubmitted(true);

      setTimeout(() => navigate('/leaderboard'), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!questionData) return <p>Loading quiz...</p>;

  return (
    <main>
      <h1>The Daily Question</h1>
      <h2>{questionData.question}</h2>
      <form>
        {questionData.answers.map((answer, index) => (
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
              {submitted && index === questionData.correctIndex ? ' (Correct)' : ''}
              {submitted && index === selectedAnswer && index !== questionData.correctIndex ? ' (Your Pick)' : ''}
            </label>
            <br />
          </div>
        ))}
      </form>
      {message && <h2>{message}</h2>}
      {!submitted && <button onClick={handleSubmit}>Submit Answer</button>}
    </main>
  );
}

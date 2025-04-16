import React, { useEffect, useState } from 'react';
import './BoardCSS.css';

export function Board() {
  const [topUsers, setTopUsers] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // Get current user's streak
    fetch('/api/streak', { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then(data => {
        setCurrentStreak(data.streak);
        setCurrentUser(data.username);
      })
      .catch(() => {
        setCurrentUser('Guest');
      });

    // Get top 10 streaks
    fetch('/api/streaks', { credentials: 'include' })
      .then(res => res.json())
      .then(setTopUsers);
  }, []);

  return (
    <main>
      <h1>Hi {currentUser}!</h1>
      <h1 className="streak">Your Streak: {currentStreak}🔥</h1>
      <h2>(Database tracks everyone’s streak — even if not top 10)</h2>

      <h1>Top 10 Users' Streaks!</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Streak (days)</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

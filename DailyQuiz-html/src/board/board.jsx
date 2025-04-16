import React, { useEffect, useState } from 'react';
import './BoardCSS.css';

export function Board() {
  const [topUsers, setTopUsers] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    const streaks = JSON.parse(localStorage.getItem("streaks")) || {};

    // Sort
    const sorted = Object.entries(streaks)
      .sort((a, b) => b[1] - a[1]) 
      .slice(0, 10); // top 10 only

    setTopUsers(sorted);
    setCurrentStreak(streaks[currentUser] || 0);
  }, [currentUser]);

  return (
    <main>
      <h1>Hi {currentUser || 'Guest'}!</h1>
      <h1 className="streak">Your Streak: {currentStreak}🔥</h1>
      <h2>(Database will keep track of all the current scores that aren't on the leaderboard, including yours)</h2>

      <h1>Top 10 Users' Streaks!</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Streak (days)</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map(([user, streak], index) => (
            <tr key={index}>
              <td>{user}</td>
              <td>{streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

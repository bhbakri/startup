import React, { useEffect, useState } from 'react';
import './BoardCSS.css';

export function Board() {
  const [topUsers, setTopUsers] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');
  
    socket.onopen = () => {
      console.log('✅ WebSocket connected to leaderboard updates');
    };
  
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
  
      if (msg.type === 'leaderboard') {
        console.log('📡 Received live leaderboard update:', msg.data);
        setTopUsers(msg.data);
      }
    };
  
    socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };
  
    socket.onclose = () => {
      console.log('❌ WebSocket disconnected');
    };
  
    return () => socket.close();
  }, []);
  
  
  
  return (
    <main>
      <h1>Hi {currentUser}!</h1>
      <h1 className="streak">Your Streak: {currentStreak}🔥</h1>

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

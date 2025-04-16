import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Username already exists.");
        } else {
          throw new Error("Signup failed.");
        }
      }

      const data = await response.json();
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <div className="SignInContainer">
        <div className="SignIn">
          <h1>Sign Up</h1>
          <div className="Interactables">
            <label>Enter Username</label>
            <input
              className="inputs"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="Interactables">
            <label>Enter Password</label>
            <input
              className="inputs"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="Interactables">
            <label>Enter Password Again</label>
            <input
              className="inputs"
              type="password"
              placeholder="Enter Password Again"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>
          {message && <p>{message}</p>}
          <div>
            <button onClick={handleSignup}>Sign Up</button>
          </div>
          <Link className="navItems" to="/">Back to Login</Link>
        </div>
      </div>
    </main>
  );
}

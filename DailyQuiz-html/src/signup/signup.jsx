import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
      setMessage("Username already exists.");
    } else if (password !== confirm) {
      setMessage("Passwords do not match.");
    } else {
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", username);
      setMessage("Account created!");
      setTimeout(() => navigate('/'), 1000);
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

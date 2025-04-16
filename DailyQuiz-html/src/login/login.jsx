import React, { useState } from 'react';
import './LoginPages.css';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password.');
      }

      const data = await response.json();
      setMessage(`Welcome back, ${data.username}!`);

      // Redirect after brief delay
      setTimeout(() => navigate('/quiz'), 1000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <div className="SignInContainer">
        <div className="SignIn">
          <h1>Sign In</h1>
          <div className="Interactables">
            <label>Username</label>
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
            <label>Password</label>
            <input
              className="inputs"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p>{message}</p>}
          <Link className="navItems" to="/signup">No Account?</Link>
          <div>
            <button onClick={handleLogin}>Sign In</button>
          </div>
        </div>
      </div>
    </main>
  );
}

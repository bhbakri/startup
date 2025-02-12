import React from 'react';
import './LoginPages.css';
import { Link } from 'react-router-dom';

export function Login() {
  return (  
    <main>
    <div className="SignInContainer">
        <div className="SignIn">
          <h2>(Database placeholder to check if Login info exists and is correct)</h2>
            <h1>Sign In</h1>
            <div className="Interactables">
                <label>Username</label>
                <input className="inputs" type="text" placeholder="Enter Username" name="username" required></input>
            </div>
            <div className="Interactables">
                <label>Password</label>
                <input className="inputs" type="password" placeholder="Enter Password" name="password" required></input>
            </div>
            <Link className="navItems" to="signup">No Account?</Link>
            <div>
                <button><Link to="/quiz">Sign In</Link></button>
            </div>
        </div>
    </div>
  </main>
  );
}
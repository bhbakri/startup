import React from 'react';
import { Link } from 'react-router-dom';

export function Signup() {
  return (
    <main>
        <div class="SignInContainer">
            <div class="SignIn">
                <h2>(Database placeholder to input new info to login's DB)</h2>
                <h1>Sign Up</h1>
                <div class="Interactables">
                    <label>Enter Username</label>
                    <input className="inputs" type="text" placeholder="Enter Username" name="username" required></input>
                </div>
                <div class="Interactables">
                    <label>Enter Password</label>
                    <input className="inputs" type="text" placeholder="Enter Password" name="password" required></input>
                </div>
                <div class="Interactables">
                    <label>Enter Password Again</label>
                    <input className="inputs" type="password" placeholder="Enter Password Again" name="password" required></input>
                </div>
                <div >
                    <button><Link to="/">Sign In</Link></button>
                </div>
            </div>
        </div>
    </main>
  );
}
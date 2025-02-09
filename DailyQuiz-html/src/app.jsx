import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div >
    <body className='body'>
        <div className='headerPadding'>
    <header className='header'>
        <h1>Daily Quiz</h1>
        <nav>
            <menu>
            <li><a className="navItemsOn" href="index.html">Home</a></li>
              <li><a className="navItems" href="signup.html">Signup</a></li>
              <li><a className="navItems" href="quiz.html">Quiz</a></li>
              <li><a className="navItems" href="leaderboard.html">Leaderboard</a></li>
              <li><a className="navItems" href="about.html">About</a></li>
            </menu>
          </nav>
          <hr />
      </header>
      </div>
      <main>hi!</main>
      <footer>
        <hr />
        <h2>Bassem Bakri</h2>
        <a href="https://github.com/bhbakri/startup">Website GitHub</a>
      </footer>
  </body>
  </div>;
}
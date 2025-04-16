import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Quiz } from './quiz/quiz';
import { Board } from './board/board';
import { About } from './about/about';

export default function App() {
  return <BrowserRouter>
  <div className='body'>
    <div className='headerPadding'>
      <header className='header'>
        <h1>Daily Quiz</h1>
        <nav>
          <menu>
            <li><NavLink className="navItems" to="">Home</NavLink></li>
            <li><NavLink className="navItems" to="signup">Signup</NavLink></li>
            <li><NavLink className="navItems" to="quiz">Quiz</NavLink></li>
            <li><NavLink className="navItems" to="leaderboard">Leaderboard</NavLink></li>
            <li><NavLink className="navItems" to="about">About</NavLink></li>
          </menu>
        </nav>
        <hr />
      </header>
    </div>

    <Routes>
      <Route path='/' element={<Login />} exact />
      <Route path='/signup' element={<Signup />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/leaderboard' element={<Board />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer>
      <hr />
      <h2>Bassem Bakri</h2>
      <a href="https://github.com/bhbakri/startup">Website GitHub</a>
    </footer>
  </div>
</BrowserRouter>;
}

function NotFound() {
  return <main className='body'>404: Return to sender. Address unknown.</main>;
}

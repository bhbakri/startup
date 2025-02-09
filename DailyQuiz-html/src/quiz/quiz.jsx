import React from 'react';
import "./QuizPage.css"

export function Quiz() {
  return (
      <main>
      <h1>(Username)</h1>
      <h1>The Daily Question</h1>
      <h2>(Placeholder for 3rd party call to recieve a random question for the day)</h2>
    <p>
        <input type="radio" class="answers"></input>
        <label >Answer 1</label><br></br>
        <input type="radio" class="answers"></input>
        <label>Answer 2</label><br></br>
        <input type="radio" class="answers"></input>
        <label>Answer 3</label><br></br>
        <input type="radio" class="answers"></input>
        <label>Answer 4</label><br></br>
        <button><a href="leaderboard.html">Submit Answer</a></button>
    </p>
    <h2>(React will be used to check if answer is correct, then DB will be used to update user's score. It will also make sure only 1 answer is selected)</h2>
  </main>
  );
}
import React from 'react';
import "./BoardCSS.css"

export function Board() {
  return (
    <main>
      <h1>Hi (Username)!</h1>
      <h1 class="streak">Your Streak: 36🔥(Temp number)</h1>
      <h2>(Database will keep track of all the current scores that aren't on the leaderboard, including yours)</h2>
      <h1>
        Top 10 Users' Streaks!
      </h1>
      <table>
        <tr>
          <th>Username</th>
          <th>Streak (days)</th>
        </tr>
        <tr>
          <td>User 1</td>
          <td>273</td>
        </tr>
        <tr>
          <td>User 2</td>
          <td>234</td>
        </tr>
        <tr>
          <td>User 3</td>
          <td>193</td>
        </tr>
        <tr>
          <td>User 4</td>
          <td>173</td>
        </tr>
        <tr>
          <td>User 5</td>
          <td>157</td>
        </tr>
        <tr>
          <td>User 6</td>
          <td>123</td>
        </tr>
        <tr>
          <td>User 7</td>
          <td>95</td>
        </tr>
        <tr>
          <td>User 8</td>
          <td>71</td>
        </tr>
        <tr>
          <td>User 9</td>
          <td>43</td>
        </tr>
        <tr>
          <td>User 10</td>
          <td>39</td>
        </tr>
      </table>
      <h2>(Temporary Data in table, websocket used to instantly update users' streaks)</h2>
    </main>
  );
}
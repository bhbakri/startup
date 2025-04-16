const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const fetch = require('node-fetch');

const authCookieName = 'token';
let users = [];
let streaks = {};
let quizAttempts = {};
let quizData = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;

  if (await findUser('username', username)) {
    res.status(409).send({ msg: 'User already exists' });
  } else {
    const user = await createUser(username, password);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser('username', username);
  
    if (user && await bcrypt.compare(password, user.password)) {
      user.token = uuid.v4(); // new login session
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });
  
// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  };
  

// Get streak
apiRouter.get('/streak', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    res.send({ username: user.username, streak: streaks[user.username] || 0 });
  });
  
// Update streak
apiRouter.post('/streak', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const { streak } = req.body;
    streaks[user.username] = streak;
    res.send({ success: true });
  });

apiRouter.get('/quiz/status', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const today = new Date().toISOString().split('T')[0];
  
    const lastPlayed = quizAttempts[user.username];
    const hasPlayedToday = lastPlayed === today;
  
    res.send({ canPlay: !hasPlayedToday });
  });  

  
apiRouter.post('/quiz/complete', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const today = new Date().toISOString().split('T')[0];
  
    quizAttempts[user.username] = today;
    res.send({ success: true });
});
  

apiRouter.get('/quiz/question', verifyAuth, async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
  
    if (!quizData[today]) {
        const triviaRes = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const trivia = await triviaRes.json();
        
        if (!trivia.results || trivia.results.length === 0) {
          return res.status(500).send({ error: 'Failed to fetch trivia question' });
        }
        
        const result = trivia.results[0];
        
  
      const answers = [...result.incorrect_answers, result.correct_answer];
      const shuffled = answers
        .map((answer) => ({ text: answer, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.text);
  
      quizData[today] = {
        question: result.question,
        answers: shuffled,
        correctIndex: shuffled.indexOf(result.correct_answer)
      };
    }
  
    res.send(quizData[today]);
  });
  
apiRouter.get('/streaks', (req, res) => {
    const top = Object.entries(streaks)
      .sort((a, b) => b[1] - a[1]) // sort high to low
      .slice(0, 10)
      .map(([username, streak]) => ({ username, streak }));
  
    res.send(top);
});

async function createUser(username, password) {
const passwordHash = await bcrypt.hash(password, 10);

const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
};
users.push(user);
return user;
}

async function findUser(field, value) {
if (!value) return null;
return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
});
}
  
app.listen(port, () => {
    console.log(`Startup service listening on http://localhost:${port}`);
  });

app.get('/api/test', (req, res) => {
    res.send({ msg: "Backend is alive 🚀" });
});
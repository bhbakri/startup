const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const fetch = require('node-fetch');

const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('dailyquiz');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log("Connected to MongoDB");
  } catch (ex) {
    console.log(`Failed to connect: ${ex.message}`);
    process.exit(1);
  }
})();


const authCookieName = 'token';
let quizData = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

const htmlDecode = (text) => {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
};


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

    await db.collection('users').updateOne(
      { username: user.username },
      { $set: { token: user.token } }
    );

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
  console.log("🔍 Incoming token cookie:", req.cookies.token);
  const user = await findUser('token', req.cookies.token);
  console.log("🔍 User found:", user?.username);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};
  

// Get streak
apiRouter.get('/streak', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const streakData = await db.collection('streaks').findOne({ username: user.username }) || { streak: 0 };
  res.send({ username: user.username, streak: streakData.streak });
});
  
// Update streak
apiRouter.post('/streak', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const { streak } = req.body;
  await db.collection('streaks').updateOne(
    { username: user.username },
    { $set: { streak } },
    { upsert: true }
  );
  res.send({ success: true });
});

apiRouter.get('/quiz/status', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const today = new Date().toISOString().split('T')[0];
  const attempt = await db.collection('attempts').findOne({ username: user.username });

  const hasPlayedToday = attempt && attempt.date === today;
  res.send({ canPlay: !hasPlayedToday });
});

  
apiRouter.post('/quiz/complete', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const today = new Date().toISOString().split('T')[0];
  await db.collection('attempts').updateOne(
    { username: user.username },
    { $set: { date: today } },
    { upsert: true }
  );
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
        
  
      const decodedCorrect = htmlDecode(result.correct_answer);
      const decodedIncorrect = result.incorrect_answers.map(htmlDecode);
      const answers = [...decodedIncorrect, decodedCorrect];
      const shuffled = answers
        .map((answer) => ({ text: answer, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.text);

      quizData[today] = {
        question: htmlDecode(result.question),
        answers: shuffled,
        correctIndex: shuffled.indexOf(decodedCorrect)

      };
    }
  
    res.send(quizData[today]);
  });
  
apiRouter.get('/streaks', async (req, res) => {
  const top = await db.collection('streaks')
    .find({})
    .sort({ streak: -1 })
    .limit(10)
    .toArray();

  res.send(top);
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await db.collection('users').insertOne(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return await db.collection('users').findOne({ [field]: value });
}

function setAuthCookie(res, authToken) {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? 'strict' : 'lax' // 
  });
}
  
app.listen(port, () => {
    console.log(`Startup service listening on http://localhost:${port}`);
  });

app.get('/api/test', (req, res) => {
    res.send({ msg: "Backend is alive 🚀" });
});
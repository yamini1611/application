const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Dummy user data for demonstration
const users = {
  'user1@example.com': { email: 'user1@example.com', password: 'password1', id: 1 },
  'user2@example.com': { email: 'user2@example.com', password: 'password2', id: 2 },
};

app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key', // Replace this with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in a production environment with HTTPS
  })
);

// Endpoint for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (user && user.password === password) {
    // Store user data in the session
    req.session.user = user;
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// Endpoint to check if the user is authenticated
app.get('/checkAuth', (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 4000;

const users = {
  'user1@example.com': { email: 'user1@example.com', password: 'password1', id: 1 },
  'user2@example.com': { email: 'user2@example.com', password: 'password2', id: 2 },
};

app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (user && user.password === password) {
    req.session.user = user;
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.get('/checkAuth', (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

app.get('/tasks', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4000/tasks');
    const tasks = response.data;
    const batch = req.query.batch;
    const filteredTasks = batch ? tasks.filter((task) => task.Batch === batch) : tasks;
    res.json(filteredTasks);
  } catch (error) {
    console.error('Error fetching tasks from API: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/tasks', async (req, res) => {
  const updatedTasks = req.body;

  try {
    const response = await axios.put('http://localhost:4000/tasks', updatedTasks);
    const updatedTasksResponse = response.data;

    return res.status(200).json(updatedTasksResponse);
  } catch (error) {
    console.error('Error updating tasks: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/viewStatus', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4000/viewStatus');
    const viewStatusData = response.data;
    const batch = req.query.batch;
    const filteredViewStatus = batch ? viewStatusData.filter((task) => task.Batch === batch) : viewStatusData;
    res.json(filteredViewStatus);
  } catch (error) {
    console.error('Error fetching viewStatus from API: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/viewStatus', async (req, res) => {
  const { status, completedBy, Batch, TaskTopic } = req.body;

  if (!status || !completedBy || !Batch || !TaskTopic) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await axios.post('http://localhost:4000/viewStatus', {
      status,
      completedBy,
      Batch,
      TaskTopic,
    });

    console.log('Received Completed Task:', req.body);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error saving completed task: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

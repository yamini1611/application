const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
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

const tasksFilePath = path.join(__dirname, 'tasks.json');

const readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(tasksFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks from file: ', error);
    return [];
  }
};

const saveTasksToFile = (tasks) => {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error saving tasks to file: ', error);
  }
};

app.get('/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  const batch = req.query.batch;
  const filteredTasks = batch ? tasks.filter((task) => task.Batch === batch) : tasks;
  res.json(filteredTasks);
});

app.put('/tasks', async (req, res) => {
  const updatedTasks = req.body;

  try {
    const tasks = readTasksFromFile();

    for (const updatedTask of updatedTasks) {
      const taskId = updatedTask.id;
      const taskToUpdate = tasks.find((task) => task.id === parseInt(taskId));

      if (!taskToUpdate) {
        return res.status(404).json({ message: 'Task not found' });
      }

      for (const key in updatedTask) {
        taskToUpdate[key] = updatedTask[key];
      }

      // Retrieve the user's name from the /login endpoint
      const userResponse = await axios.get('http://localhost:4000/login');
      const userData = userResponse.data;
      const user = userData.find((userItem) => userItem.email === req.session.user.email);

      if (user) {
        taskToUpdate.completedBy = user.name;
      }
    }

    saveTasksToFile(tasks);

    return res.status(200).json(updatedTasks);
  } catch (error) {
    console.error('Error updating tasks: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/TasksCompleted', (req, res) => {
  const { status, completedBy, Batch, TaskTopic } = req.body;

  if (!status || !completedBy || !Batch || !TaskTopic) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Process the data or save it to the database
  // For this example, we'll just log the received data
  console.log('Received Completed Task:', req.body);

  return res.status(200).json({ message: 'Completed Task Received' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

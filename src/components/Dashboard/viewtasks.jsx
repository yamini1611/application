import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../Authentication/Context';
import { toast } from 'react-toastify';

const Viewtasks = () => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [userBatch, setUserBatch] = useState('');
  const [userTasks, setUserTasks] = useState([]);
  const [completedBy, setCompletedBy] = useState(''); // Store completedBy name

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/tasks');
      setTasks(response.data);

      const loginResponse = await axios.get('http://localhost:4000/login');
      const userData = loginResponse.data;

      const loggedInUser = userData.find((userItem) => userItem.email === user.email);
      if (loggedInUser) {
        setUserBatch(loggedInUser.batch);
        const userSpecificTasks = response.data.filter((task) => task.Batch === loggedInUser.batch);
        setUserTasks(userSpecificTasks);
        setCompletedBy(loggedInUser.name); // Set the name of the logged-in user
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [user.email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (taskId, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    try {
      toast.success('Status updated successfully!', { autoClose: 1800, position: 'top-center' });

      // Update status on the server-side
      await axios.put(`http://localhost:4000/tasks/${taskId}`, {
        ...taskToUpdate,
        status: newStatus,
      });

      // Save completed tasks with user's name to /TasksCompleted endpoint
      if (newStatus === 'Completed') {
        await axios.post('http://localhost:4000/viewStatus', {
          status: newStatus,
          completedBy,
          DueDate:taskToUpdate.DueDate,
          Batch: taskToUpdate.Batch,
          TaskTopic: taskToUpdate.TaskTopic,
        });
      }

      fetchData(); // Refetch the tasks to get the updated data
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  return (
    <div style={{ fontSize: 22.1, fontFamily: 'Product Sans,Arial,Helvetica,sans-serif', marginTop: 100 }}>
      {user.loggedIn && userBatch ? (
        <div>
          <h1 style={{ fontSize: 36, color: 'darkred', textAlign: 'center' }}>
            Tasks Assigned to Batch ({userBatch})
          </h1>
          <br />
          {userTasks.length > 0 ? (
            <div className="container">
              <Table id="hj">
                <thead>
                  <tr>
                    <th>Task Topic</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Completed By</th> {/* New column for Completed By */}
                  </tr>
                </thead>
                <tbody>
                  {userTasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.TaskTopic}</td>
                      <td>{task.Description}</td>
                      <td>{task.DueDate}</td>
                      <td>{task.Batch}</td>
                      <td>
                        <Button
                          onClick={() => handleStatusChange(task.id, 'In Progress')}
                          style={{ marginRight: 10, backgroundColor: 'yellow', color: 'black' }}
                        >
                          In Progress
                        </Button>
                        <Button
                          style={{ backgroundColor: 'green', color: 'white' }}
                          onClick={() => handleStatusChange(task.id, 'Completed')}
                        >
                          Completed
                        </Button>
                      </td>
                      <td>{completedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No tasks found for the selected batch.</p>
          )}
        </div>
      ) : (
        <p>Please log in or check your batch information.</p>
      )}
    </div>
  );
};

export default Viewtasks;

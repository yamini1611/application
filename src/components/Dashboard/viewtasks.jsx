import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { UserContext } from '../Authentication/Context';

const Viewtasks = () => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [userBatch, setUserBatch] = useState('');
  const [updatedTasks, setUpdatedTasks] = useState({});
  const [userTasks, setUserTasks] = useState([]);
  const [completedBy, setCompletedBy] = useState({}); // Store completedBy names

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
      await axios.put(`http://localhost:4000/tasks/${taskId}`, {
        ...taskToUpdate, // Keep the existing fields
        status: newStatus, // Update the status field
        completedBy: completedBy, // Add the completedBy field with the name of the logged-in user
      });

      // Update the tasks in the state with the new status
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
      );

      // Update the updatedTasks state to reflect the change
      setUpdatedTasks((prevUpdatedTasks) => ({
        ...prevUpdatedTasks,
        [taskId]: { ...taskToUpdate, status: newStatus },
      }));
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  return (
    <div>
      {user.loggedIn && userBatch ? (
        <div>
          <h1 style={{ fontSize: 36, color: 'darkred' }}>Tasks Assigned to Batch ({userBatch})</h1>
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
                        <input
                          type="text"
                          value={updatedTasks[task.id]?.status || task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        />
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

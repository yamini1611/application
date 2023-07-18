import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { UserContext } from '../Authentication/Context';

const Viewtasks = () => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [userBatch, setUserBatch] = useState('');
  const [updatedTopics, setUpdatedTopics] = useState({});
  const [updatedDescriptions, setUpdatedDescriptions] = useState({});
  const [updatedDueDates, setUpdatedDueDates] = useState({});
  const [updatedBatches, setUpdatedBatches] = useState({});
  const [userTasks, setUserTasks] = useState([]);

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
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [user.email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTopicChange = (e, taskId) => {
    setUpdatedTopics((prevTopics) => ({
      ...prevTopics,
      [taskId]: e.target.value,
    }));
  };

  const handleDescriptionChange = (e, taskId) => {
    setUpdatedDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [taskId]: e.target.value,
    }));
  };

  const handleDueDateChange = (e, taskId) => {
    setUpdatedDueDates((prevDueDates) => ({
      ...prevDueDates,
      [taskId]: e.target.value,
    }));
  };

  const handleBatchValueChange = (e, taskId) => {
    setUpdatedBatches((prevBatches) => ({
      ...prevBatches,
      [taskId]: e.target.value,
    }));
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    try {
      await axios.put(`http://localhost:4000/tasks/${taskId}`, {
        status: newStatus,
        TaskTopic: updatedTopics[taskId] || taskToUpdate.TaskTopic,
        Description: updatedDescriptions[taskId] || taskToUpdate.Description,
        DueDate: updatedDueDates[taskId] || taskToUpdate.DueDate,
        Batch: updatedBatches[taskId] || taskToUpdate.Batch,
      });

      // Update the tasks in the state with the new status and updated fields
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
                TaskTopic: updatedTopics[taskId] || task.TaskTopic,
                Description: updatedDescriptions[taskId] || task.Description,
                DueDate: updatedDueDates[taskId] || task.DueDate,
                Batch: updatedBatches[taskId] || task.Batch,
              }
            : task
        )
      );
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  return (
    <div>
    {user.loggedIn && userBatch ? (
      <div>
        <h1 style={{ fontSize: 36, color: 'darkred' }}>Tasks Assigned to Batch ({userBatch})</h1>
<br></br>
        {userTasks.length > 0 ? (
          <div className="container">
            <Table id="hj">
              <thead>
               
                  <th>Task Topic</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                
              </thead>
              <tbody>
                {userTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      {updatedTopics[task.id] ? (
                        <input
                          type="text"
                          value={updatedTopics[task.id]}
                          onChange={(e) => handleTopicChange(e, task.id)}
                        />
                      ) : (
                        task.TaskTopic
                      )}
                    </td>
                    <td>
                      {updatedDescriptions[task.id] ? (
                        <input
                          type="text"
                          value={updatedDescriptions[task.id]}
                          onChange={(e) => handleDescriptionChange(e, task.id)}
                        />
                      ) : (
                        task.Description
                      )}
                    </td>
                    <td>
                      {updatedDueDates[task.id] ? (
                        <input
                          type="date"
                          value={updatedDueDates[task.id]}
                          onChange={(e) => handleDueDateChange(e, task.id)}
                        />
                      ) : (
                        task.DueDate
                      )}
                    </td>
                    <td>
                      {updatedBatches[task.id] ? (
                        <input
                          type="text"
                          value={updatedBatches[task.id]}
                          onChange={(e) => handleBatchValueChange(e, task.id)}
                        />
                      ) : (
                        task.Batch
                      )}
                    </td>
                    <td>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      >
                        <option value="Select Progress" disabled>
                          Select Progress
                        </option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
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

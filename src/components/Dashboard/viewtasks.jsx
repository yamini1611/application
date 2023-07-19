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

  const handleStatusChange = (taskId, e) => {
    const newStatus = e.target.value;
    setUpdatedTasks((prevTasks) => ({
      ...prevTasks,
      [taskId]: {
        ...prevTasks[taskId],
        status: newStatus,
        TaskTopic: prevTasks[taskId]?.TaskTopic || '',
        Description: prevTasks[taskId]?.Description || '',
        DueDate: prevTasks[taskId]?.DueDate || '',
        Batch: prevTasks[taskId]?.Batch || '',
      },
    }));
  };

  const updateTasks = async () => {
    try {
      for (const taskId in updatedTasks) {
        const updatedTask = updatedTasks[taskId];
        const taskToUpdate = tasks.find((task) => task.id === taskId);
        if (!taskToUpdate) continue;

        await axios.put(`http://localhost:4000/tasks/${taskId}`, updatedTask);
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          status: updatedTasks[task.id]?.status || task.status,
          TaskTopic: updatedTasks[task.id]?.TaskTopic || task.TaskTopic,
          Description: updatedTasks[task.id]?.Description || task.Description,
          DueDate: updatedTasks[task.id]?.DueDate || task.DueDate,
          Batch: updatedTasks[task.id]?.Batch || task.Batch,
        }))
      );

      setUpdatedTasks({});
    } catch (error) {
      console.error('Error updating tasks: ', error);
    }
  };

  useEffect(() => {
    if (Object.keys(updatedTasks).length > 0) {
      updateTasks();
    }
  }, [updatedTasks]);

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
                  </tr>
                </thead>
                <tbody>
                  {userTasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <input
                          type="text"
                          value={updatedTasks[task.id]?.TaskTopic || task.TaskTopic}
                          onChange={(e) =>
                            setUpdatedTasks((prevTasks) => ({
                              ...prevTasks,
                              [task.id]: {
                                ...prevTasks[task.id],
                                TaskTopic: e.target.value,
                              },
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={updatedTasks[task.id]?.Description || task.Description}
                          onChange={(e) =>
                            setUpdatedTasks((prevTasks) => ({
                              ...prevTasks,
                              [task.id]: {
                                ...prevTasks[task.id],
                                Description: e.target.value,
                              },
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={updatedTasks[task.id]?.DueDate || task.DueDate}
                          onChange={(e) =>
                            setUpdatedTasks((prevTasks) => ({
                              ...prevTasks,
                              [task.id]: {
                                ...prevTasks[task.id],
                                DueDate: e.target.value,
                              },
                            }))
                          }
                        />
                      </td>
                      <td>{task.Batch}</td>
                      <td>
                        <input
                          type="text"
                          value={updatedTasks[task.id]?.status || task.status}
                          onChange={(e) => handleStatusChange(task.id, e)}
                        />
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

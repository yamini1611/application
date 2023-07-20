import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewStatus() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch the data from the API endpoint
    axios.get("http://localhost:4000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div  className="container" style={{ fontSize: 22.1,backgroundColor:"white" ,fontFamily: "Product Sans,Arial,Helvetica,sans-serif" ,marginTop:100}}>
      <h1 >Tasks Status</h1>
      <table className="table table-striped">
        <thead>

            <th>Batch</th>
            <th>Task Topic</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Completed By</th>
        
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.Batch}</td>
              <td>{task.TaskTopic}</td>
              <td>{task.status}</td>
              <td>{task.DueDate}</td>
              <td>{task.completedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

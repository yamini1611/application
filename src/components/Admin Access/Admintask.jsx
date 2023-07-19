import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminTask() {
  const [Tasks, SetTasks] = useState({
    TaskTopic: null,
    Description: null,
    DueDate: null,
    Batch: null,
    status: null,
  });

  const [AllTasks, SetAllTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
    fetchLoginData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      SetAllTasks(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchLoginData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/login");
      const userData = response.data;
      const completedByMapData = {};
      userData.forEach((user) => {
        completedByMapData[user.email] = user.name;
      });
      
    } catch (error) {
      console.error("Error fetching login data: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetTasks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlepost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/tasks", {
        ...Tasks, // Pass all the task details
        CompletedBy: Tasks.CompletedBy, // Include the CompletedBy field with the email
      });
      toast.success("Task created successfully!", { autoClose: 1800, position: "top-center" });
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/tasks/${selectedTaskId}`, {
        ...Tasks, // Pass all the existing task details
        CompletedBy: Tasks.CompletedBy, // Include the CompletedBy field with the email
      });
      toast.success("Task updated successfully!", { autoClose: 1800, position: "top-center" });
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleRemove = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${taskId}`);
      toast.success("Task removed successfully!", { autoClose: 1800, position: "top-center" });
      fetchData();
    } catch (error) {
      console.error("Error removing task: ", error);
    }
  };

  const handleEdit = (task) => {
    setSelectedTaskId(task.id);
    SetTasks({
      TaskTopic: task.TaskTopic,
      Description: task.Description,
      DueDate: task.DueDate,
      Batch: task.Batch,
      status: task.status,
     
    });
  };

  const closeModal = () => {
    setSelectedTaskId(null);
    SetTasks({
      TaskTopic: null,
      Description: null,
      DueDate: null,
      Batch: null,
      status: null,
     
    });
  };

  const filteredTasks = AllTasks.filter((task) => {
    return (
      task.TaskTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.Description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <div id="admintask">
      <div className="d-flex">
        <div className="input-group">
          <label>SEARCH : </label>
          <input
            style={{ paddingLeft: 6, marginLeft: 10 }}
            type="text"
            className=""
            placeholder="Search by Task Topic"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="col-8" style={{ display: "flex" }}>
        <h1 style={{ marginTop: 50, marginLeft: 0 }}>ADMIN TASK CREATION</h1>
        <button
          id="assign"
          style={{ height: 40, marginTop: 50, marginLeft: 50 }}
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          ASSIGN TASK
        </button>
      </div>
      <br></br>
      <div className="row">
        <div>
          <h1 style={{ marginLeft: 50, textAlign: "center" }}>Assigned Tasks</h1>
          <br></br>
          <ul id="border">
            {filteredTasks.map((task) => (
              <h3 key={task.id} className="card mb-4 d-flex">
                <span>Task Topic : {task.TaskTopic || "N/A"} </span>
                <br></br>
                <span>Description : {task.Description || "N/A"} </span>
                <br></br>
                <span>Due Date {task.DueDate || "N/A"} </span>
                <br></br>
                <span>Batch : {task.Batch || "N/A"}</span>
                <br></br>
                <span>Status : {task.status || "N/A"}</span>
                <br></br>
               
                <div className="d-flex">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(task)}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    style={{ marginLeft: 400, marginRight: 20 }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleRemove(task.id)}>
                    Remove
                  </button>
                </div>
              </h3>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {selectedTaskId ? "Edit Task" : "Create Task"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={selectedTaskId ? handleUpdate : handlepost}>
                <div className="mb-3 row">
                  <label htmlFor="taskTopic" className="col-sm-2 col-htmlForm-label">
                    Task Topic
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="TaskTopic"
                      className="form-control"
                      value={Tasks.TaskTopic}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="description" className="col-sm-2 col-htmlForm-label">
                    Description
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="Description"
                      className="form-control"
                      value={Tasks.Description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="dueDate" className="col-sm-2 col-htmlForm-label">
                    Due Date
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      name="DueDate"
                      className="form-control"
                      value={Tasks.DueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="batchDropdown" className="col-sm-2 col-htmlForm-label">
                    Batch
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      id="batchDropdown"
                      name="Batch"
                      value={Tasks.Batch}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Batch</option>
                      <option value="2020-2023">2020-2023</option>
                      <option value="2021-2024">2021-2024</option>
                      <option value="2022-2025">2022-2025</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="status" className="col-sm-2 col-htmlForm-label">
                    Status
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      value={Tasks.status}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {selectedTaskId ? "Update" : "Assign"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
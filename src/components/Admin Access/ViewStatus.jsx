import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function ViewStatus() {
  const [viewStatus, setViewStatus] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sortOption, setSortOption] = useState("nearest");
  const [batchFilter, setBatchFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/viewStatus")
      .then((response) => {
        setViewStatus(response.data);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching viewStatus:", error);
      });
  }, []);

  const sortedAndFilteredViewStatus = useMemo(() => {
    let filteredData = viewStatus;
    if (batchFilter) {
      filteredData = viewStatus.filter((task) => task.Batch === batchFilter);
    }

    let sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      if (sortOption === "nearest") {
        return new Date(a.DueDate) - new Date(b.DueDate);
      } else {
        return new Date(b.DueDate) - new Date(a.DueDate);
      }
    });

    return sortedData;
  }, [viewStatus, batchFilter, sortOption]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleBatchFilterChange = (batch) => {
    setBatchFilter(batch);
  };

  return (
    <div className="container" style={{ fontSize: 22.1, backgroundColor: "white", fontFamily: "Product Sans,Arial,Helvetica,sans-serif", marginTop: 100 }}>
     <div className="d-flex">

    
     <h1>Tasks Status</h1>
      <div style={{ marginBottom: 20  ,marginLeft:300}}>
        <label>
          Sort by:{" "}
          <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="nearest">Nearest Date</option>
            <option value="farthest">Farthest Date</option>
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 20  ,marginLeft:100  }}>
        <label>
          Filter by Batch:{" "}
          <select value={batchFilter} onChange={(e) => handleBatchFilterChange(e.target.value)}>
            <option value="">All Batches</option>
            <option value="2020-2023">2020-2023</option>
            <option value="2021-2024">2021-2024</option>
            <option value="2022-2025">2022-2025</option>
          </select>
        </label>
      </div>
      </div>
      {dataLoaded ? (
        <table className="table table-striped">
          <thead>
           
              <th>Batch</th>
              <th>Task Topic</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Completed By</th>
           
          </thead>
          <tbody>
            {sortedAndFilteredViewStatus.map((task) => (
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

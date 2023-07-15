import React, { useContext } from 'react';
import { UserContext } from '../Context/Context';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user.email}</p> : <p>Please login to view the dashboard.</p>}
    </div>
  );
};

export default Dashboard;

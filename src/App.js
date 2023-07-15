import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Dashboard from './components/Authentication/dashboard';
import UserProvider from './components/Context/Context';
import Navbar from './components/navbar/navbar';

const App = () => {
  const [loginData, setLoginData] = useState(null); // Initialize loginData as null

  useEffect(() => {
    // Fetch user data from JSON file
    fetch('http://localhost:4000/login')
      .then((response) => response.json())
      .then((data) => setLoginData(data));
  }, []);

  const handleLogin = (userData) => {
    // Update the user data in loginData state
    setLoginData((prevData) => ({
      ...prevData,
      login: [...prevData.login, userData],
    }));
  };

  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route
            path="/signup"
            element={<Signup handleLogin={handleLogin} />}
          />
          <Route
            path="/login"
            element={<Login loginData={loginData} handleLogin={handleLogin} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;

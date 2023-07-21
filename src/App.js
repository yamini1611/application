// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './components/Authentication/Context';
import Navbar from './components/navbar/navbar';
import Login from './components/Authentication/login/login';
import Dashboard from './components/Dashboard/dashboard';
import Admin from './components/Admin Access/Admin';
import Home from './components/homepage/homepage'; // Import your Home component here
import Signup from './components/Authentication/signup/signup';
import AdminTask from './components/Admin Access/Admintask';
import Viewtasks from './components/Dashboard/viewtasks';
import ViewStatus from './components/Admin Access/ViewStatus';
import Classmates from './components/Classmates/Classmates';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         <Route  path="/dashboard" element={<Dashboard />}></Route>
         <Route  path="/classmates" element={<Classmates/>}></Route>
         <Route  path="view" element={<Viewtasks />}></Route>
         <Route  path="/Admin" element={<Admin />}></Route>
         <Route  path="/Admin1" element={<AdminTask />}></Route>
         <Route  path="/ViewStatus" element={<ViewStatus />}></Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

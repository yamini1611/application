import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserProvider from './components/Authentication/Context'; // Import the UserProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
);

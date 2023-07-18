import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    email: '',
    password: '',
  });

  const handleLogin = async (email, password) => {
    try {
      // Fetch user data from the API
      const response = await fetch('http://localhost:4000/login');
      const data = await response.json();

      // Check if the email and password match any registered user
      const registeredUser = data.find(user => user.email === email && user.password === password);

      if (registeredUser) {
        setUser({
          loggedIn: true,
          email,
          password,
          
        });
      } else {
        setUser({
          loggedIn: false,
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser({
        loggedIn: false,
        email: '',
        password: '',
      });
    }
  };

  const handleLogout = () => {
    setUser({
      loggedIn: false,
      email: '',
      password: '',
    });
  };

  // ... update the user state or retrieve it from local storage ...

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

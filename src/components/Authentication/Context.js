import React, { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    email: '',
    password: '',
  });

  const handleLogin = async (email, password) => {
    try {
  
      const response = await fetch('http://localhost:4000/login');
      const data = await response.json();


      const registeredUser = data.find(user => user.email === email && user.password === password);

      if (registeredUser) {
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
    toast.success('Logged out successful!', {
      position: 'top-center',
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setUser({
      loggedIn: false,
      email: '',
      password: '',
    });
  };



  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
      <ToastContainer />

    </UserContext.Provider>
  );
};

export default UserProvider;

import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    role: '',
  });

  const logout = () => {
    setUser((prevUser) => ({
      ...prevUser,
      loggedIn: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

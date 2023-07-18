import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../Authentication/Context';
import ProtectedPage from '../homepage/homepage'; 

const RestrictedRoute = ({ element, ...rest }) => {
  const { user } = useContext(UserContext);


  return user.loggedIn ? (
    <>
      <ProtectedPage name={user.name} />
      <Route {...rest} element={element} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default RestrictedRoute;

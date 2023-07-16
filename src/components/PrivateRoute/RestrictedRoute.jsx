import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../Authentication/Context';
import ProtectedPage from '../homepage/homepage'; // Import the ProtectedPage component

const RestrictedRoute = ({ element, ...rest }) => {
  const { user } = useContext(UserContext);

  // If the user is logged in, allow access to the element (page)
  // Otherwise, redirect to the login page
  return user.loggedIn ? (
    <>
      <ProtectedPage name={user.name} /> {/* Display the welcome message */}
      <Route {...rest} element={element} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default RestrictedRoute;

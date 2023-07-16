import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../Authentication/Context';

const Navbar = () => {
  const { user, handleLogout } = useContext(UserContext);

  const handleLogoutClick = () => {
    handleLogout();
    // Redirect to login page after logout
    return <Navigate to="/login" />;
  };

  // Check if the user is an admin
  const isAdmin = user.email === 'admin@gmail.com' && user.password === 'admin';

  return (
    <nav className="navbar navbar-expand-lg navbar bg-dark" id='navbar' style={{fontSize:25 , color:"white"}}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">Home</Link>
            </li>
            {/* Show the "Admin Access" link only if the user is logged in as an admin */}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/Admin">Admin Access</Link>
              </li>
            )}

            {user.loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">GROCERIES</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLogoutClick}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

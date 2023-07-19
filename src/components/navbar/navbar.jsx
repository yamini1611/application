import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../Authentication/Context';

const Navbar = () => {
  const { user, handleLogout } = useContext(UserContext);
  const isAdmin = user.email === 'admin@gmail.com' && user.password === 'admin';
  const [userData, setUserData] = useState([]);
  const handleLogoutClick = () => {
    handleLogout();
    return <Navigate to="/login" />;
  };
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/login');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light" id='navbar' style={{ fontSize: 35,backgroundColor:"grey"}}>
      <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/"><p id='color'>Home</p></Link>
            </li>
            {isAdmin && (
              <>
                <li> <Link className="nav-link" to="/Admin1">Admin Tasks</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin">Admin Access</Link>
                </li>
                {userData.length > 0 && ( // Check if userData is available
                  <li className="nav-item">
                    <h3 ><i className="fa-solid fa-user fa-flip" style={{color:"white"}}></i>Admin </h3> 
                  </li>

                  
                )}
                 <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLogoutClick}>Logout</Link>
                </li>
              </>
            )}

            {user.loggedIn && !isAdmin ? ( // Only display for regular users
              <>
                <li className="nav-item">
                  <Link className="nav-link"to="/dashboard">Groceries</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/view">View Tasks</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLogoutClick}>Logout</Link>
                </li>
                {userData.length > 0 && ( 
                  <li className="nav-item" style={{marginLeft:600}}>
                    <h3 style={{fontSize:28 , fontFamily:"sans" ,marginTop:0}}><i className="fa-solid fa-user fa-flip" style={{color:"white"}}></i>{userData.find(u => u.email === user.email)?.name}</h3> 
                  </li>
                )}
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

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
    <nav className="navbar navbar-expand-lg navbar-light" id='navbar' style={{ fontSize: 22.1,backgroundColor:"white" ,fontFamily: "Product Sans,Arial,Helvetica,sans-serif"}}>
      <div className="container-fluid" id='ni'>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-0" style={{marginTop:-1}}>
            <li className="nav-item">
              <Link className="nav-link " to="/"><img src="https://edu.google.com/assets/icons/pages/main/workspace-for-education/classroom/classroom-banner-2.svg" alt='' ></img></Link>
            </li>
            <li className="nav-item">
             <Link className="nav-link  mt-1"   to="/classmates">People</Link>
            </li>
            {isAdmin && (
              <>
                <li> <Link className="nav-link mt-1" to="/Admin1"> Tasks  Assigned</Link></li>
                
               
                 <li className="nav-item">
                  <Link className="nav-link mt-1" to="/login" onClick={handleLogoutClick}>Logout</Link>
                </li>
                {userData.length > 0 && (
                  <li className="nav-item">
                    <h3 style={{ fontSize: 22.1 ,fontFamily: "Product Sans,Arial,Helvetica,sans-serif" , color:"grey" ,marginTop:11 ,marginLeft:650}}><i className="fa-solid fa-user fa-flip" ></i> Pallavi Katari</h3> 
                  </li>

                  
                )}
              </>
            )}

            {user.loggedIn && !isAdmin ? ( 
              <>
               
                <li className="nav-item">
                  <Link className="nav-link mt-1" to="/view">View Tasks</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mt-1" to="/login" onClick={handleLogoutClick}>Logout</Link>
                </li>
                {userData.length > 0 && ( 
                  <li className="nav-item" style={{marginLeft:600}}>
                    <h3  style={{ fontSize: 22.1 ,fontFamily: "Product Sans,Arial,Helvetica,sans-serif" , color:"grey" ,marginTop:11}}><i className="fa-solid fa-user fa-flip" ></i>{userData.find(u => u.email === user.email)?.name}</h3> 
                  </li>
                )}
              </>
            ) : (
              <>
                {!isAdmin && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link  mt-1" to="/login">Login <i class="fa-solid fa-right-to-bracket"></i></Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link  mt-1" to="/signup">SignUp <i class="fa-solid fa-user-plus"></i></Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

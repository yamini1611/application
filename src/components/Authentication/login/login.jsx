import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../Context';
import '../login/login.css';
import Viewtasks from '../../Dashboard/viewtasks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, handleLogin } = useContext(UserContext);
  const [viewTasksVisible, setViewTasksVisible] = useState(false); // State to control visibility
  const [batch, setBatch] = useState(''); 
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, batch); 
    setViewTasksVisible(true)
    
  };

  if (user.loggedIn) {
    return <>
    <Navigate to="/" />;
    {viewTasksVisible && <Viewtasks batch={batch} />}
    </>
  }

  return (
    <section className="vh-110" id="close">
      <div className="container py-5 h-100">
        <div className="col col-xl-10">
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>
                  <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Sign into your account
                  </h5>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example17">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form2Example17"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example27">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form2Example27"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="batchDropdown">
                      Batch
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="batchDropdown"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                    >
                      <option value="2020-2023">2020-2023</option>
                      <option value="2021-2024">2021-2024</option>
                      <option value="2022-2025">2022-2025</option>
                    </select>
                  </div>
                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                  Don't have an account? <Link to="/signup" style={{ color: '#393f81' }}>Register here</Link>
                </p>
                <a href="#!" className="small text-muted">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> 
      {viewTasksVisible && <Viewtasks batch={batch} />}
    </section>
  );
};

export default Login;

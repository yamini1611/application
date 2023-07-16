import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform validation checks here if required
      if (password !== repeatPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      await axios.post('http://localhost:4000/signup', { name, email, password });
      // Redirect to the dashboard or protected route on successful signup
      window.location.replace('/login');
    } catch (error) {
      console.error(error);
      // Handle errors or show error message to the user as needed
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: 'white'  , marginTop:80}}>
      <div className="container h-100">
       
          <div className="col-lg-12 col-xl-11">
            
             
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                       
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example1c">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i> Your Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          
                        </div>
                      </div>
                      <div clasName="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example3c">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>Your Email
                          </label> <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                         
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4c">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>Password
                          </label><input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />

                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4cd">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
Repeat your password
                          </label><input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                          />
                         
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample "
                    />
                  </div>
                </div>
             
            </div>
          </div>
       
    </section>
  );
};

export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../signup/signup.css'
import { Link } from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== repeatPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      const data = {
        name,
        email,
        password,
        batch: selectedBatch, 
      };

      await axios.post('http://localhost:4000/login', data);
      toast.success('Registered successfully!', { autoClose: 1800, position: 'top-center' });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="vh-100"style={{ fontSize: 18.1,backgroundColor:"white" ,fontFamily: "Product Sans,Arial,Helvetica,sans-serif" ,marginTop:80}}>
      <div className="container h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <p className="text-center h1  mb-5 mx-1 mx-md-4 mt-4" id='ch'><img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="Google" height="84px" width="144px" data-iml="3068.89999999851"></img> Sign Up </p>
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
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="form3Example3c">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>Your Email
                    </label>
                    <input
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
                    </label>
                    <input
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
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>Repeat your password
                    </label>
                    <input
                      type="password"
                      id="form3Example4cd"
                      className="form-control"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="batchDropdown">
                      Batch
                    </label>
                    <select
                      className="form-select"
                      id="batchDropdown"
                      value={selectedBatch}
                      required
                      onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                      <option value="" disabled="true" >Select Batch</option>
                      <option value="2020-2023">2020-2023</option>
                      <option value="2021-2024">2021-2024</option>
                      <option value="2022-2025">2022-2025</option>
                    </select>
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
                    I agree to all statements in Terms of service
                  </label>
                </div>
                <div  className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <Link to="/login" style={{textDecoration:"none" , color:"black"}}>Already have a Account - Login <i class="fa-solid fa-right-to-bracket"></i></Link>
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
                alt="Sample"
              />
            </div>
          </div>
        </div>
       
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signup;

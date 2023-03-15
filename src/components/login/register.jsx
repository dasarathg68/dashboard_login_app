import React from "react";
import axios from "axios";
import loginimg from "../../login.svg";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const  Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [device_id, setdeviceID] = useState('');
  const handleEmailChange = (e) => setEmail(e.currentTarget.value);

  const handlePasswordChange = (e) => setPassword(e.currentTarget.value);
  const handleNameChange = (e) => setName(e.currentTarget.value);
  const handledeviceIDChange = (e) => setdeviceID(e.currentTarget.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    var url='http://localhost:9000/users/signup';
    var user_type ="ADMIN"
    axios.defaults.withCredentials = true;
    axios.post(url, { email, password, name, device_id, user_type }).then((response)=>{
      console.log(response);
      toast.success("Account created successfully",{position: toast.POSITION.TOP_CENTER});
      setTimeout(function() {
        //your code to be executed after 1 second
        window.location.reload(true);
      }, 1500);
    }, (error) => {
      console.log(error);
      toast.error("Invalid credentials",{position: toast.POSITION.TOP_CENTER});
    });
  }
  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginimg} alt="login" />
          </div>
          <form id="my-form" className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={email} onChange={handleEmailChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input type="text" name="Name" placeholder="First Name" value={name} onChange={handleNameChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="HDID">Home ID/Device ID</label>
              <input
                type="text"
                name="HDID"
                placeholder="Home ID/Device ID"
                value={device_id}
                onChange={handledeviceIDChange}
              />
            </div>
          </form>
     
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={handleSubmit}>
          Register
        </button>     
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;

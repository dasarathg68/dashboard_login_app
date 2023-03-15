import React, { useState } from "react";
import loginImg from "../../login.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function setToken(token) {
  localStorage.setItem('token', JSON.stringify(token))
}
function getToken() {
  return JSON.parse(localStorage.getItem('token'))
}

export const Login = (props) => {
  const showToastMessage = () => {
    toast.success('Login successful', {
        position: toast.POSITION.TOP_CENTER
    });
};
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.currentTarget.value);

  const handlePasswordChange = (e) => setPassword(e.currentTarget.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    var url='http://localhost:9000/users/login';
    axios.defaults.withCredentials = true;
    axios.post(url, { email, password })
      .then((response) => {
        console.log(response);
        setToken(response.data.token);
        if(getToken() === ""){
          console.log("token is empty");
        } else {
          console.log("everything good, logged in");
          console.log(getToken());
          showToastMessage();
          var delayInMilliseconds = 1500; //1 second

          setTimeout(function() {
            //your code to be executed after 1 second
            navigate('/dashboard');
          }, delayInMilliseconds);
          

        }
      }, (error) => {
        console.log(error);
        toast.error("Invalid credentials",{position: toast.POSITION.TOP_CENTER});
      });
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="login" />
        </div>
        <form id="my-form" className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </div>
        </form>
      </div>
   
      <div className="footer">
  
        <button type="button" onClick={handleSubmit} className="btn" form="my-form">
          Login
        </button>
        <ToastContainer />
     
      </div>
    </div>
  );
}

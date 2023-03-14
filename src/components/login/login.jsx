import React, { useState } from "react";
import loginImg from "../../login.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function setToken(token) {
  localStorage.setItem('token', JSON.stringify(token))
}
function getToken() {
  return JSON.parse(localStorage.getItem('token'))
}

export const Login = (props) => {
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
          navigate('/dashboard');

        }
      }, (error) => {
        console.log(error);
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
      </div>
    </div>
  );
}

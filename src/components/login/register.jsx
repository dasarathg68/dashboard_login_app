import React from "react";
import loginimg from "../../login.svg";

export const  Register = (props) => {
  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginimg} alt="login" />
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input type="text" name="Name" placeholder="First Name" />
            </div>
            <div className="form-group">
              <label htmlFor="HDID">Home ID/Device ID</label>
              <input
                type="text"
                name="HDID"
                placeholder="Home ID/Device ID"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;

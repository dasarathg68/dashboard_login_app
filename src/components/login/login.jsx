import React from "react";
import loginImg from "../../login.svg";
import { BehaviorSubject } from 'rxjs';

import axios from "axios";
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


function setToken(token) {
  sessionStorage.setItem('token', JSON.stringify(token))
}
function getToken() {
  const tokenString = sessionStorage.getItem('token')
  const userToken = JSON.parse(tokenString)
  return userToken?.token
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email:'',
      password:'',
    }; 
  }
  

handleEmailChange = (e) => this.setState({
  email: e.currentTarget.value,
})

handlePasswordChange = (e) => this.setState({
  password: e.currentTarget.value,
})


  render() {
  
   const handleSubmit=(event)=>{
      event.preventDefault();
      var url='http://localhost:9000/users/login'
      axios.defaults.withCredentials = true
      
     var userData= axios.post(url,
         {
          email:this.state.email,
          password:this.state.password
        }).then((response) => {
        console.log(response.data);
        // localStorage.setItem('currentUser', JSON.stringify(response.data));
        // currentUserSubject.next(response.data);
        setToken(response.data.token)
          }, (error) => {
        console.log(error);
      });
    
     

     /* // Working
        var url='http://localhost:9000/users'
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1zZGhhbnVzaDA2QGdtYWlsLmNvbSIsIkZpcnN0X25hbWUiOiJEaGFudXNoIiwiTGFzdF9uYW1lIjoiSE9NRTAwNyIsIlVpZCI6IjY0MDk2YzFmYzY2MGMwNmRjYmY2MzEzZiIsIlVzZXJfdHlwZSI6IkFETUlOIiwiZXhwIjoxNjc4NzAzNzkwfQ.vjvx2r8BXVS00iauEdcc3pRfglRfRrpciNdWjrHi--I";
        //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true
        const headers= {'Authorization': "Bearer " + token,'Content-Type': 'application/json',};
        console.log({headers})
      

        axios.get(url,{headers})
        .then(res => {
       //   res.header("Access-Control-Allow-Origin","*");
        console.log(res)
        }).catch(err => {
        console.log(err)
        });
        */
      
   }
     

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form id="my-form" className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
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
}
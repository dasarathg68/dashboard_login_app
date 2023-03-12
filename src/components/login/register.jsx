import React from "react"
import loginimg from "../../login.svg"


export class Register extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return( 
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                        <img src={loginimg}></img>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" placeholder="email"></input>

                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="password"></input>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input type="text" name="Name" placeholder="First Name"></input>
                                
 
                            </div>
                            <div className="form-group">
                                <label htmlFor="HDID">Home ID/Device ID</label>
                                <input type="text" name="HDID" placeholder="Home ID/Device ID"></input>        
                            </div>
                        </div>
                        </div>
                    </div>
            <div className="footer">
                <button type="button" className="btn">Register</button>
            </div>
            </div>);
    }
}
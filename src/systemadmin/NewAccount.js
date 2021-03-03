import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//import { Link } from "react-router-dom";
import "./SystemAdmin.css";

import users from "../redux/ducks/users";

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: this.props.match.params.id,
      //username: null,
      email: null,
      password: null,
      uname: null,
      dob:null,
      gender: null,
      role: null,
      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    if (
      this.state.email == null ||
      this.state.password == null 
     // this.state.username == null
    )
      return false;
    //initialisation
    else
      return (
        this.state.email.length > 0 &&
        this.state.password.length > 0 
       // this.state.username.length > 0
      );
  }

  handleInputChange(event) {
    this.setState({
      ...this.state,
      ...{
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    console.log("form was submitted");
    event.preventDefault();

    console.log(this.state);

    users
      .create(this.state)
      .then(() => {
        this.props.history.push("/login");
      })
      .catch((error) => console.log(error));
  }

  render() {
   // console.log("username: " + this.state.username);
    console.log("email: " + this.state.email);
    return (
      <div className="main">
        <div className="account-form">
          <form onSubmit={this.handleSubmit}>
            <h3>New Account</h3>
            <p> </p>

            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                onChange={this.handleInputChange}
                style={{marginLeft:55, marginTop:10}}
              /> <br/><br/>
            </div>
           
            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={this.handleInputChange}
                style={{marginLeft:20, marginTop:10}}
              /><br/><br/>
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="uname"
                className="form-control"
                placeholder="Enter Name"
                name="uname"
                onChange={this.handleInputChange}
                style={{marginLeft:59, marginTop:10}}
              /><br/><br/>
            </div>

            <div className="form-group">
              <label>Birthdate</label>
              <input
                type="dob"
                className="form-control"
                placeholder="Enter Date of Birth"
                name="dob"
                onChange={this.handleInputChange}
                style={{marginLeft:30, marginTop:10}}
              /><br/><br/>
            </div>
            
            <div className="form-group">
              <label>Gender</label>
              <select 
                type="gender"
                className="form-control"  
                placeholder="Enter Gender"
                name="gender" 
                value={this.state.gender} 
                onChange={this.handleInputChange}
               style={{marginLeft:45, marginTop:10, width:100}}
              >
               <option value="Male">Male</option>
               <option value="Female">Female</option>
              </select>
              <br/><br/>
           
            </div>

            <div className="form-group">
              <label>Role   </label>
              <select 
                type="role"
                className="form-control"  
                placeholder="Select Role"
                name="role" 
                value={this.state.role} 
                onChange={this.handleInputChange}
                style={{marginLeft:65, marginTop:10, width:100}}>
               <option value="Patient">Patient</option>
               <option value="Doctor">Doctor</option>
              </select>
              <br/>
              </div>

            <Button
              variant="contained"
              color="secondary"
              disabled={!this.validateForm()}
              type="submit"
              value="Submit"
              style={{marginLeft:90, marginTop:30}}
            >
              Submit
            </Button>

           
          </form>
        </div>
      </div>
    );
  }
}

export default SignupPage;
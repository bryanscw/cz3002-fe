import React, { Component } from "react";
import { Button, CssBaseline, TextField, Container } from "@material-ui/core";
import { authenticateLogin } from "../redux/ducks/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResultController from '../results/ResultController.jsx';
import {Route} from "react-router-dom";

//import "./Login.css";

 
class LoginPage extends Component {
  state = {
    username: "",
    password: "",
   };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
    
  handleSubmit = (e) => {

    try {
      this.props.authenticateLogin(this.state);
      this.props.history.push('/results');
    } catch (e) {
      alert(e.message);
    }
    
   };

render() {
  const { username, password } = this.state;
  
  <Route key="ResultController" path="/results" exact component={ResultController} />

  return (
    <div className="main" data-test="loginContainer">
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="login-form">
        <h3>Login</h3>
        <form
          noValidate
          onSubmit={this.handleSubmit}
        >
          <TextField
            data-testid="usernameField"
            onChange={this.handleChange}
            defaultValue={username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            //style={{height:25, width:200, marginLeft:55}}
          />
          <TextField
            data-testid="passwordField"
            onChange={this.handleChange}
            defaultValue={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            //style={{height:25, width:200, marginLeft:55}}
          />
          <Button
            data-testid="loginButton"
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            style={{  marginTop: 20 }}
          >Login</Button>
        
        </form>
      </div>
      </Container>
    </div>
    );
  }

}
LoginPage.propTypes = {
  /** An action creator for authenticating login */
  authenticateLogin: PropTypes.func.isRequired
  /** An object used for styling */
};

const dispatchers = {
  authenticateLogin
};



export default connect(() => ({}), dispatchers)(LoginPage);

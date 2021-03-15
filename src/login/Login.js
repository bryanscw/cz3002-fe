import React, { Component } from "react";
import { Button, CssBaseline, TextField, Container, Typography } from "@material-ui/core";
import { authenticateLogin, fetchMe } from "../redux/ducks/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { getRoles } from "@testing-library/dom";


//import "./Login.css";


class LoginPage extends Component {

  state = {
    username: "",
    password: "",
    doctor: null,
    user: null,
    admin: null
  };


  handleInputChange = input => e => {
    this.setState({ [input]: e.target.value })
  }

  validateForm() {
    if (
      this.state.username == null ||
      this.state.password == null

    )
      return false;
    else
      return (
        this.state.username.length > 0 &&
        this.state.password.length > 0

      );
  };

  checkrole() {
   let a = localStorage.getItem("role");
    console.log(a);
    if (a === "ROLE_ADMIN") 
      return this.props.history.push('/systemadmin');
    else return this.props.history.push('/main');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try {   
      this.props.authenticateLogin(this.state);
      window.alert(this.state);
      localStorage.setItem("role", (this.state));
      this.checkrole();
    }
    catch (err) {
      alert("Invalid Credentials");
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="main" data-test="loginContainer">
        <Container component="main" maxWidth="xs" align="center" style={{ marginTop: 150 }} >
          <CssBaseline />
          <div className="login-form">
            <Typography variant="h3" style={{ marginBottom: 20 }}>Login</Typography>

            <form>
              <TextField
                data-testid="usernameField"
                onChange={this.handleInputChange("username")}
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
                onChange={this.handleInputChange("password")}
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
                style={{ marginTop: 20 }}
                onClick={() => this.handleSubmit()}
                disabled={!this.validateForm()}
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
  authenticateLogin: PropTypes.func.isRequired,
  fetchMe: PropTypes.func.isRequired
  /** An object used for styling */
};

const dispatchers = {
  authenticateLogin,
  fetchMe
};



export default connect(() => ({}), dispatchers)(LoginPage);
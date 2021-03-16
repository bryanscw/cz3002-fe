import React, { Component } from "react";
import { Button, CssBaseline, TextField, Container, Typography } from "@material-ui/core";

import { authenticateLogin, fetchMe } from "../redux/ducks/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class LoginPage extends Component {


  state = {
    username: "",
    password: "",
    // role: null,
    // user: null,
    // admin: null
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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

  // fetchUser(){
  //   let user = this.props.fetchMe(this.state);
  //   let a = localStorage.fetchMe("role");


  // };


  // redirectTo() {
  //   switch (user.role) {
  //     case USER_ROLE.ADMIN:
  //       return this.props.history.push('/systemadmin');
  //       break;
  //     case USER_ROLE.patient:
  //       return this.props.history.push('/main');
  //       break;
  //     case USER_ROLE.doctor:
  //       return this.props.history.push('/main');
  //       break;
  //     default:
  //       return this.props.history.push('/main');
  //       break;

  //   }
  // };

  //   if (a === "ROLE_ADMIN") {
  //     return this.props.history.push('/systemadmin'); }
  //   else { return this.props.history.push('/main'); }
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    try {   
      this.props.authenticateLogin(this.state);
      console.log(this.state);
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
  fetchMe: PropTypes.func.isRequired,

  /** An object used for styling */
};


const dispatchers = {
  authenticateLogin,
  fetchMe
};

export default connect(() => dispatchers)(LoginPage);
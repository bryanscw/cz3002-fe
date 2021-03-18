import React, { Component } from "react";
import { Button, CssBaseline, TextField, Container, Typography } from "@material-ui/core";
import {
  fetchMe,
  selectUser,
  selectUserLoading,
  selectUserFailed,
  authenticateLogin
} from "../redux/ducks/auth";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  calcRedirect = (userRole) => {
    //this.props.fetchMe(this.state)
    if (userRole === 'admin') {
      return <Redirect from={this.props.path} to={`${this.props.path}/systemadmin`} />
    } else {
      return <Redirect from={this.props.path} to={`${this.props.path}/main`} />
    }
  }

  handleSubmit = (e) => {
    const { role } = this.props.user;
    e.preventDefault();
    try {
      this.setState({ username: "", password: "" });
      const { username, password } = this.state;
      this.props.login(this.state);
      this.props.history.push('/main');

    } catch (e) {
      alert(e.message);
    }
  };
  //  var a = localStorage.fetchMe("role");
  //   console.log(this.state);
  //   if(a==="ROLE_DOCTOR"){
  //     this.props.history.push('/doctor');}
  //     else if (a==="ROLE_ADMIN"){
  //       this.props.history.push('/systemadmin');
  //     }
  //     else{
  //       this.props.history.push('/user');
  //     }


  render() {

    return (
      <div className="main" data-test="loginContainer">
        <Container component="main" maxWidth="xs" align="center" style={{ marginTop: 150 }} >
          <CssBaseline />
          <div className="login-form">
            <Typography variant="h3" style={{ marginBottom: 20 }}>Login</Typography>

            <form
              noValidate
              onSubmit={this.handleSubmit}>
              {this.props.fetchMeSuccessAction ? "Logged in" : ""}
              {this.props.fetchMeRequestAction && !this.props.fetchMeSuccessAction ? "Logging.." : ""}
              <TextField
                data-testid="usernameField"
                onChange={this.handleChange}
                value={this.state.username}
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
                value={this.state.password}
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
              <div className="form-group">
                <Button
                  data-testid="loginButton"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: 20 }}
                >Login</Button>
              </div>
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
  fetchMeSuccessAction: PropTypes.func.isRequired,
  fetchMeRequestAction: PropTypes.func.isRequired,
  userFailed: PropTypes.bool,
  user: PropTypes.object.isRequired,
  fetchMe: PropTypes.func.isRequired
  /** An object used for styling */
};

const dispatch = {
  authenticateLogin,
  fetchMe
};



const mapStateToProps = state => {
  return {
    fetchMeSuccessAction: state.fetchMeSuccessAction,
    fetchMeRequestAction: state.fetchMeRequestAction,

    user: selectUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(authenticateLogin(data))
  };
};
// const connectedLoginPage = connect(mapStateToProps)(LoginPage);
// export { connectedLoginPage as LoginPage }; 
export default connect(mapStateToProps,
  mapDispatchToProps)(LoginPage);
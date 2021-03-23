import React, {Component} from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from "@material-ui/core";
import {authenticateLogin, fetchMe, selectUser} from "../../redux/ducks/auth";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authenticateLogin(this.state);
    // try {
    //   this.setState({username: "", password: ""});
    //   const {username, password} = this.state;
    //   this.props.authenticateLogin(this.state);
    //   this.props.history.push('/main');
    // } catch (e) {
    //   window.alert('Invalid Credentials!')
    //   alert(e.message);
    // }
  };

  render() {

    return (
        <div className="main" data-test="loginContainer">
          <Container component="main" maxWidth="xs" align="center"
                     style={{marginTop: 150}}>
            <CssBaseline/>
            <div className="login-form">
              <Typography variant="h3"
                          style={{marginBottom: 20}}>Login</Typography>

              <form
                  noValidate
                  onSubmit={this.handleSubmit}>
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
                />
                <div className="form-group">
                  <Button
                      data-testid="loginButton"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      style={{marginTop: 20}}
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
  // fetchMeSuccessAction: PropTypes.func.isRequired,
  // fetchMeRequestAction: PropTypes.func.isRequired,
  // userFailed: PropTypes.bool,
  // user: PropTypes.object.isRequired,
  // fetchMe: PropTypes.func.isRequired
  /** An object used for styling */
};

const dispatch = {
  authenticateLogin
};

// const mapStateToProps = state => {
//   return {
//     fetchMeSuccessAction: state.fetchMeSuccessAction,
//     fetchMeRequestAction: state.fetchMeRequestAction,
//
//     user: selectUser(state)
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     login: data => dispatch(authenticateLogin(data))
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

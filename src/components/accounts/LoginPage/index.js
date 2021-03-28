import React, { Component } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { authenticateLogin } from '../../../redux/ducks/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.authenticateLogin(this.state);
  };

  render() {
    return (
      <div className="main" data-test="loginContainer">
        <Container component="main" maxWidth="xs" align="center"
          style={{ marginTop: 150 }}>
          <div className="login-form">
            <Typography variant="h3"
              style={{ marginBottom: 20 }}>Login</Typography>

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
                  style={{
                    marginTop: 20,
                    height: 40,
                    fontSize: 16,
                  }}
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
  /** An object used for styling */
};

const dispatchers = {
  authenticateLogin,
};

export default connect(() => ({}), dispatchers)(LoginPage);

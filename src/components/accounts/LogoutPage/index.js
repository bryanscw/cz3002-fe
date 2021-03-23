import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, CssBaseline, Typography} from "@material-ui/core";
import {logout} from '../../../redux/ducks/auth';

/**
 * This component displays the logout page for user.
 */
export class LogoutPage extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
        <Container component="main" maxWidth="xs" align="center"
                   style={{marginTop: 150}}>
          <CssBaseline/>
          <Typography variant="h4" style={{marginBottom: 20}}>You have logged
            out</Typography>
          <Typography variant="h5" style={{marginBottom: 20}}>Thanks for
            visiting.</Typography>
          <Button
              data-testid="loginButton"
              type="submit"
              href="/login"
              fullWidth
              variant="contained"
              color="secondary"
              style={{marginTop: 20, height: 50, fontsize: 30}}
          >Go back to Login</Button>

        </Container>
    )
  }
}

export default connect(null, {logout})(LogoutPage)
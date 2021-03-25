import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import { selectUser } from '../../../redux/ducks/auth';
import Button from '@material-ui/core/Button';

/**
 * This component displays the home page of the web application.
 */
export class HomePage extends Component {
  render() {
    const {
      user,
    } = this.props;

    return (
      <div className="main">
        <Container component="main" maxWidth="sm">
          <Typography component="h1" variant="h2" align="center"
            color="textPrimary" gutterBottom>
            Trail Making Test
          </Typography>
          <Typography variant="h5" align="center"
            color="textSecondary" paragraph>
            Trail Making Test is a simple neuropsychological test of
            cognitive processes, including attention, visual search
            and scanning, and psychomotor speed.
          </Typography>
          {
            user && Object.keys(user).length !== 0 ? (
              <Button variant="contained" color="primary" href="/dashboard">
                To Dashboard
              </Button>
            ) : null
          }

        </Container>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(HomePage);

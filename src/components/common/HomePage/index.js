import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Typography, Box } from '@material-ui/core';
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
        <Container component="main" maxWidth="s" align="center">
          <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
            <Box fontSize={90} borderRadius={16}
              textAlign="center" letterSpacing={2} >
              Trail Making Test
        </Box>
          </Typography>
          <Typography variant="h5" align="center"
            color="textSecondary" style={{ marginTop: 40 }} paragraph>
            Trail Making Test is a simple neuropsychological <br /> test of
            cognitive processes, including attention, <br /> visual search
            and scanning, and psychomotor speed.
          </Typography>
          {
            user && Object.keys(user).length !== 0 ? (
              <Button variant="contained" style={{ width: 200, height: 50, fontSize: 17, marginTop: 50, marginBottom: 30 }} color="primary" href="/dashboard">
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

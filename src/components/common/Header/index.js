import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../../../redux/ducks/auth';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({});

/**
 * This component displays the header of the web application.
 */
export class Header extends Component {
  render() {
    const {
      user,
    } = this.props;

    const authLinks = (
      <Box className="buttons">
        <Button color="inherit" href="/dashboard">Dashboard</Button>
        <Button color="inherit" href="/logout">Logout</Button>
      </Box>
    );

    const guestLinks = (
      <Button color="inherit" href="/login">Login</Button>
    );

    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography style={{ flex: 1 }} variant="h6" color="inherit" noWrap>
            TRAIL MAKING TEST
          </Typography>
          {user && Object.keys(user).length !== 0 ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../../../redux/ducks/auth';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { green, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  header: {
    '-webkit-text-fill-color': '#ffffff',
  },

  loginButton: {
    fontSize: 16,
    width: 100,
    height:35,
    float: 'right',
    color:'#ffffff',
    backgroundColor:'#009688',
    '&:hover': {
      backgroundColor:'#4db6ac',
    },
  },

  logoutButton: {
    fontSize: 16,
    width: 100,
    height:35,
    float: 'right',
    color:'#ffffff',
    backgroundColor:'#e91e63',
    '&:hover': {
      backgroundColor:'#f06292',
    },
  },
});

/**
 * This component displays the header of the web application.
 */
export class Header extends Component {
  render() {
    const {
      user,
    } = this.props;

    const {
      classes,
    } = this.props;

    const authLinks = (
      <Box className="logout">
        <Button className={classes.logoutButton} size="small" component={Link}
          href="/logout">
          Logout
        </Button>
      </Box>
    );

    const guestLinks = (
      <Button className={classes.loginButton} size="small" component={Link}
        href="/login">
        Login
      </Button>
    );

    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography style={{ flex: 1 }} variant="h6" color="inherit" noWrap>
            <Link style={{ colour:'white'}} className={classes.header} href="/">TRAIL MAKING
                                                      TEST</Link>
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
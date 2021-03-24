import React, {Component} from "react";
import {connect} from "react-redux";
import {selectUser} from "../../../redux/ducks/auth";
import {AppBar, Box, Toolbar, Typography} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import {green, red} from "@material-ui/core/colors"
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const styles = theme => ({
  header: {
    "-webkit-text-fill-color": "#cccccc",
  },

  loginButton: {
    float: "right",
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  logoutButton: {
    float: "right",
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  }
});

/**
 * This component displays the header of the web application.
 */
export class Header extends Component {
  render() {
    const {
      user
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
          <Toolbar>
            <Typography style={{flex: 1}} variant="h6" color="inherit" noWrap>
              <Link className={classes.header} href="/home">TRAIL MAKING
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
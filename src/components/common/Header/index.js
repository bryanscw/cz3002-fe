import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {selectUser} from "../../../redux/ducks/auth";
import {
    AppBar,
    Box,
    Button,
    withStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import { red, green } from "@material-ui/core/colors"
import "./index.css";

/**
 * This component displays the header of the web application.
 */
export class Header extends Component {
  render() {
    const {
      user
    } = this.props;

    const LogoutButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
            '&:hover': {
                backgroundColor: red[700],
            },
        },
    }))(Button);

    const LoginButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
    }))(Button);

    const authLinks = (
        <Box className="logout">
            <LogoutButton size="small" component={ Link } to="/logout">
                Logout
            </LogoutButton>
        </Box>
    );

    const guestLinks = (
            <LoginButton className="login" size="small" component={ Link } to="/login">
                Login
            </LoginButton>
    );

    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography style={{flex: 1}} variant="h6" color="inherit" noWrap>
                        <Link className="header" style={{textDecoration: "none"}} to="/home">
                                TRAIL MAKING TEST
                        </Link>
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

export default connect(mapStateToProps)(Header);
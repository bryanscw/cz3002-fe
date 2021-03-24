import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {selectUser} from "../../../redux/ducks/auth";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

/**
 * This component displays the header of the web application.
 */
export class Header extends Component {
    render() {
        const {
            user
        } = this.props;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-navml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" align="center" noWrap>
                        TRAIL MAKING TEST
                    </Typography>
                </Toolbar>
                {user && Object.keys(user).length !== 0 ? authLinks : guestLinks}
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

export default connect(mapStateToProps)(Header);
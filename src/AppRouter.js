import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
    refreshTokenLogin,
    selectUserLoading,
    selectUserFailed,
    selectUser,
    selectRefreshToken
} from "./redux/ducks/auth";
import Game from './game/Game';
import ResultController from './results/ResultController.jsx';
import NewAccount from './systemadmin/NewAccount.js';
import UpdateUser from './systemadmin/UpdateUser.js';
import SystemAdmin from './systemadmin/SystemAdmin.js';
import Login from './login/Login.js';
import Main from "./Main.js";

/** This component handles the routing for the app */
class AppRouter extends Component {
    componentDidMount() {
        const { refresh_token, refreshTokenLogin } = this.props;
 
        if (refresh_token) refreshTokenLogin(refresh_token);
    }

    render() {
        let routes = [
            <Route key="LoginPage" path="/LOGIN" exact component={Login} />,
            <Redirect key="LoginRedirect" from="/" exact to="/LOGIN" />,
            <Route key="NewAccount" path="/NEWACCOUNT" exact component={NewAccount} />,
            <Route key="UpdateUser" path="/UPDATEUSER" exact component={UpdateUser} />,
            <Route key="SystemAdmin" path="/SYSTEMADMIN" exact component={SystemAdmin} />,
            <Route key="Topics" path="/TOPIC" exact component={Topic} />,
            <Route key="RESULT" path="/RESULT" exact component={ResultController} />,
            <Route key="GAME" path="/GAME" exact component={Game} />,
            <Route key="MAIN" path="/MAIN" exact component={Main} />,
            ];

        return (
            <BrowserRouter>
                <Switch>
                    {routes}
                    <Redirect from="/" to="/not-found" />
                </Switch>
            </BrowserRouter >
        );
    }
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
  }

AppRouter.propTypes = {
    refresh_token: PropTypes.string,
    // userLoading: PropTypes.bool.isRequired,
    // userFailed: PropTypes.bool,
    // user: PropTypes.object,
    refreshTokenLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    // userLoading: selectUserLoading(state),
    // userFailed: selectUserFailed(state),
    // user: selectUser(state),
     refresh_token: selectRefreshToken(state)
});

const dispatchers = {
    refreshTokenLogin
};

export default connect(mapStateToProps, dispatchers)(AppRouter);
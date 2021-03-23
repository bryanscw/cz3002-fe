import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, Redirect, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
    refreshTokenLogin,
    selectUserLoading,
    selectUserFailed,
    selectUser,
    selectRefreshToken
} from "./redux/ducks/auth";
import Game from './components/game/Game';
import ResultController from './components/results/ResultController.jsx';

import SystemAdmin from './components/systemadmin/SystemAdmin.js';
import ViewDiagnosisDoc from './components/diagnosis/ViewDiagnosisDoc.js';
import SubmitDiagnosis from './components/diagnosis/SubmitDiagnosis.js'
import editDiagnosis from './components/diagnosis/editDiagnosis.js'
import Login from './components/login/Login.js';
import Logout from './components/login/Logout.js';
import Main from "./Main.js";

/** This component handles the routing for the app */
class AppRouter extends Component {
    componentDidMount() { }

    render() {

        let routes = [
            <Route key="LoginPage" path="/login" exact component={Login} />,
            <Redirect key="LoginRedirect" from="/" exact to="/login" />,
            <Route key="SystemAdmin" path="/admin" exact component={SystemAdmin} />,

            <Route key="Game" path="/game" exact component={Game} />,
            <Route key="ResultController" path="/result" exact component={ResultController} />,
            <Route key="Main" path="/main" exact component={Main} />,
            <Route key="LogoutPage" path="/logout" exact component={Logout} />,
            <Route key="SubmitDiagnosis" path="/SubmitDiagnosis/:result" exact component={SubmitDiagnosis} />,
            <Route key="editDiagnosis" path="/editDiagnosis/:result" exact component={editDiagnosis} />,
            <Route key="ViewDiagnosisDoc" path="/viewDiagnosis/:id" exact component={ViewDiagnosisDoc} />,
        ];
        return (
            <BrowserRouter>
                <Switch>
                    {routes}
                    <Redirect from="/" to="/not-found" />
                    <Route path="/viewDiagnosis/:id">
                        <ViewDiagnosisDoc />
                    </Route>
                    <Route path="/SubmitDiagnosis/:result" >
                        <SubmitDiagnosis />
                    </Route>
                    <Route path="/editDiagnosis/:result">
                        <editDiagnosis />
                    </Route>
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
    userLoading: PropTypes.bool.isRequired,
    userFailed: PropTypes.bool,
    user: PropTypes.object,
    refreshTokenLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    userLoading: selectUserLoading(state),
    userFailed: selectUserFailed(state),
    user: selectUser(state),
    refresh_token: selectRefreshToken(state)
});

const dispatchers = {
    refreshTokenLogin
};

export default connect(mapStateToProps, dispatchers)(AppRouter);
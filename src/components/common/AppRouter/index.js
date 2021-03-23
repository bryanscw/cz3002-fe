import React, {Component} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {
  refreshTokenLogin,
  selectRefreshToken,
  selectUser,
  selectUserFailed,
  selectUserLoading
} from "../../../redux/ducks/auth";
import Errors from '../Errors';
import Loader from 'react-loader-spinner';
import NotFoundPage from "../NotFoundPage";
import LogoutPage from "../../accounts/LogoutPage";
import LoginPage from "../../accounts/LoginPage";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import accountsRoutes from "../../accounts/accountsRoutes";
import {USER_ROLES} from "../../../utils/constants";

/** This component handles the routing for the app */
class AppRouter extends Component {
  componentDidMount() {
    const {
      refresh_token,
      refreshTokenLogin
    } = this.props;

    if (refresh_token) {
      refreshTokenLogin(refresh_token);
    }
  }

  render() {
    const {
      userLoading,
      userFailed,
      user,
      refresh_token
    } = this.props;

    if (userLoading && refresh_token) {
      return <Loader/>;
    }

    let routes = [
      <Route key="Login" path="/login" exact component={LoginPage}/>,
      <Redirect key="LoginRedirect" from="/" exact to="/login"/>,
    ];

    switch (user.role) {
      case USER_ROLES.ADMIN:
        routes = routes.concat(accountsRoutes);
        break;

      case USER_ROLES.DOCTOR:
        // routes = routes.concat(doctorRoutes);
        break;

      case USER_ROLES.PATIENT:
        // routes = routes.concat(patientRoutes);
        break;

      default:
        break;
    }

    if (!userFailed && user && Object.keys(user).length !== 0
        && user.constructor === Object) {
      routes = [
        <Redirect
            key="LoginRedirect"
            from="/login"
            to="/"
        />
      ]
    }

    return (
        <BrowserRouter>
          <Errors/>
          <Header/>
          <Switch>
            <Route
                path="/not-found"
                exact
                component={NotFoundPage}
            />
            <Route
                path="/logout"
                exact
                component={LogoutPage}
            />
            {routes}
            <Redirect
                from="/"
                to="/not-found"
            />
          </Switch>
          <Footer/>
        </BrowserRouter>
    );
  }

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
import React, {Component} from "react";
import DoctorResult from './DoctorResult.jsx'
import PatientResult from '../../patient/PatientHomePage/PatientResult'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import {
  fetchMe,
  selectUser,
  selectUserFailed,
  selectUserLoading
} from '../../../redux/ducks/auth.js'
import {connect} from "react-redux";
import PropTypes from "prop-types";

class ResultController extends Component {
  componentDidMount = () => {
    this.props.fetchMe(localStorage.getItem('access_token'))
  }
  calcRedirect = (userRole) => {
    if (userRole === 'ROLE_DOCTOR') {
      return <Redirect from={this.props.location.pathname}
                       to={`${this.props.location.pathname}/doctor`}/>
    } else {
      return <Redirect from={this.props.location.pathname}
                       to={`${this.props.location.pathname}/patient`}/>
    }
  }
  render = () => {
    const {role} = this.props.user
    return (
        <Router>
          {this.calcRedirect(role)}
          <Switch>
            <Route path={`${this.props.location.pathname}/doctor`}
                   component={DoctorResult}/>
            <Route path={`${this.props.location.pathname}/patient`}
                   component={PatientResult}>
            </Route>
          </Switch>
        </Router>
    )
  }
}

ResultController.propTypes = {
  userLoading: PropTypes.bool.isRequired,
  userFailed: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userLoading: selectUserLoading(state),
  userFailed: selectUserFailed(state),
  user: selectUser(state),
});

const dispatchers = {
  fetchMe
};

export default connect(mapStateToProps, dispatchers)(ResultController);
import React, { Component } from "react";
import ResultList from './ResultList.jsx'
import DoctorResult from './DoctorResult.jsx'
import PatientResult from './PatientResult'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom";
import {
    fetchMe,
    selectUser,
    selectUserLoading,
    selectUserFailed
} from '../redux/ducks/auth.js'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from '../redux/store.js'

class ResultController extends Component {
    componentDidMount = () => {
        this.props.fetchMe(this.state)
    }
    calcRedirect = (userRole) => {
        if (userRole === 'doctor') {
            return <Redirect from={this.props.path} to={`${this.props.path}/doctor`} />
        } else {
            return <Redirect from={this.props.path} to={`${this.props.path}/patient`} />
        }
    }
    render = () => {
        const {role} = this.props.user
        return (
            <div>
                {this.calcRedirect(role)}
                <Route path={`${this.props.path}/doctor`}>
                    <DoctorResult path={`${this.props.path}/doctor`}/>
                </Route>
                <Route path={`${this.props.path}/patient`}>
                    <PatientResult/>
                </Route>
            </div>
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

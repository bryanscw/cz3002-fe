import React, { Component } from "react";
import { 
    listUserResults,
    listAllResults,    
    selectResultsLoading,
    selectResultsFailed,
    selectResults,
} from '../redux/ducks/result'
import {
    listUsers,
    selectUsers,
    selectUsersLoading,
    selectUsersFailed
} from '../redux/ducks/users'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResultList from './ResultList.jsx'

class DoctorResult extends Component {
    componentDidMount(){
        this.props.listAllResults(this.state)
    }

    render = () => {
        console.log(this.props.results)
        return <ResultList resultHistory={this.props.results}/>
    }
}

DoctorResult.propTypes = {
    listUserResults: PropTypes.func.isRequired,
    listAllResults: PropTypes.func.isRequired,
    listUsers: PropTypes.func.isRequired,
    resultsLoading: PropTypes.bool.isRequired,
    resultsFailed: PropTypes.bool,
    results: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    resultsLoading: selectResultsLoading(state),
    resultsFailed: selectResultsFailed(state),
    results: selectResults(state),
    usersLoading: selectUsersLoading(state),
    usersFailed: selectUsersFailed(state),
    users: selectUsers(state),
});

const dispatchers = {
    listUserResults,
    listAllResults,
    listUsers
};

export default connect(mapStateToProps, dispatchers)(DoctorResult);
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { 
    listUserResults,    
    selectResultsLoading,
    selectResultsFailed,
    selectResults,
} from '../redux/ducks/result'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResultList from './ResultList.jsx'

class PatientResult extends Component {
    componentDidMount(){
        this.props.listUserResults(this.state)
    }

    render = () => {
        if (this.props.resultsLoading) {
            return <div>Loading results...</div>
        } else if (this.props.resultsFailed) {
            return <div>Load results failed.</div>
        } else {
            return <ResultList resultHistory={this.props.results}/>
        }
    }
}

PatientResult.propTypes = {
    /** An action creator */
    listUserResults: PropTypes.func.isRequired,
    /** A boolean to determine if the results are still being loaded (true: still loading, false: fully loaded) */
    resultsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the users failed to be loaded the action creator(true: still loading or failed to load, false: successful load) */
    resultsFailed: PropTypes.bool,
    /** An array of results objects loaded by the action creator */
    results: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    resultsLoading: selectResultsLoading(state),
    resultsFailed: selectResultsFailed(state),
    results: selectResults(state),
});

const dispatchers = {
    listUserResults
};

export default connect(mapStateToProps, dispatchers)(PatientResult);

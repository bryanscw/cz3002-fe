import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  listAllResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import { CircularProgress } from '@material-ui/core';

class ResultPage extends Component {

  componentDidMount() {
    this.resultId = parseInt(this.props.match.params.resultId);
    this.props.listAllResults(this.state);
  }

  render() {
    const {
      resultsLoading,
      resultsFailed,
      results,
    } = this.props;

    if (resultsLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch results, redirect to not-found
    if (resultsFailed) {
      return <Redirect to="/not-found" />;
    }

    let result = results.find(o => o.id === this.resultId);

    // If no such result is found
    if (!result) {
      return <Redirect to="/not-found" />;
    }

    return (
      <div className="container">
        {
          // Check if user has completed the test
          <p>{JSON.stringify(result)}</p>
        }

      </div>
    );
  }

}

ResultPage.propTypes = {
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
  listAllResults,
};

export default connect(mapStateToProps, dispatchers)(ResultPage);
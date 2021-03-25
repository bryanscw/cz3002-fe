import React, { Component } from 'react';
import {
  listUserResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { selectUser } from '../../../redux/ducks/auth';
import { CircularProgress, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import ResultCard from '../ResultCard';
import PendingTestCard from '../PendingTestCard';

class PatientHomePage extends Component {
  componentDidMount() {
    this.props.listUserResults(this.state);
  }

  render() {
    const {
      resultsLoading,
      resultsFailed,
      results,
      user,
    } = this.props;

    if (resultsLoading) {
      return <CircularProgress />;
    }

    if (resultsFailed) {
      return <Redirect to="/not-found" />;
    }

    // Find tests that have been completed
    let completedTests = results.filter(
      function (el) {
        // Completed tests will have a non-null time or accuracy
        return el.time || el.accuracy;
      },
    );

    // Find tests that have not been completed
    let pendingTests = results.filter(
      function (el) {
        // Completed tests will have a non-null time or accuracy
        return !el.time && !el.accuracy;
      },
    );

    return (
      <div className="container">
        <Typography variant="h1">Results for: {user.name}</Typography>

        <Typography variant="h2">Pending Test(s)</Typography>
        {
          pendingTests.length !== 0 ? (
              pendingTests.map(
                result =>
                  <PendingTestCard
                    key={result.id}
                    classes="mb-4"
                    result={result}
                  />,
              )
            )
            :
            (
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                <strong>No</strong> pending test(s) found
              </Alert>
            )
        }

        <Typography variant="h2">Completed Test(s)</Typography>
        <br />

        {
          completedTests.length !== 0 ? (
              completedTests.map(
                result =>
                  <ResultCard
                    key={result.id}
                    classes="mb-4"
                    result={result}
                    badge={result.accuracy && result.time ? <span
                        className="badge badge-success">Completed</span>
                      : <span className="badge badge-secondary">Not Completed</span>}
                  />,
              )
            )
            :
            (
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                <strong>No</strong> result(s) found
              </Alert>
            )
        }

      </div>
    );
  }
}

PatientHomePage.propTypes = {
  /** An action creator */
  listUserResults: PropTypes.func.isRequired,
  /** A boolean to determine if the results are still being loaded (true: still loading, false: fully loaded) */
  resultsLoading: PropTypes.bool.isRequired,
  /** A boolean to determine if the users failed to be loaded the action creator(true: still loading or failed to load, false: successful load) */
  resultsFailed: PropTypes.bool,
  /** An array of results objects loaded by the action creator */
  results: PropTypes.array.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  resultsLoading: selectResultsLoading(state),
  resultsFailed: selectResultsFailed(state),
  results: selectResults(state),
  user: selectUser(state),
});

const dispatchers = {
  listUserResults,
};

export default connect(mapStateToProps, dispatchers)(PatientHomePage);
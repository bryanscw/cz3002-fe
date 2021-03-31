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
import { CircularProgress, Container } from '@material-ui/core';
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
    } = this.props;

    if (resultsLoading) {
      return <CircularProgress align="center"
        style={{
          marginTop: 190,
          marginLeft: '50%'
        }} />;
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
      <Container>

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
              <div style={{
                width: '100%',
                padding: '40px',
              }}>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  <strong>No</strong> pending test(s) found
                </Alert>
              </div>
            )
        }

        {
          completedTests.length !== 0 ? (
              <ResultCard
                key={completedTests.id}
                classes="mb-4"
                results={completedTests}
                badge={completedTests.accuracy && completedTests.time ?
                  <span
                    className="badge badge-success">Completed</span>
                  :
                  <span
                    className="badge badge-secondary">Not Completed</span>}
              />
            )
            :
            (
              <div style={{
                width: '100%',
                padding: '40px',
              }}>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  <strong>No</strong> result(s) found
                </Alert>
              </div>
            )
        }

      </Container>
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
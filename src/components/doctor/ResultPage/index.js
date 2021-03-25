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
import { Box, CircularProgress } from '@material-ui/core';
import {
  fetchDiagnosis,
  selectDiagnosis,
  selectDiagnosisFailed,
  selectDiagnosisLoading,
} from '../../../redux/ducks/diagnosis';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';

class ResultPage extends Component {

  componentDidMount() {
    this.resultId = parseInt(this.props.match.params.resultId);
    this.props.listAllResults(this.state);
    this.props.fetchDiagnosis(this.resultId);
  }

  render() {
    const {
      resultsLoading,
      resultsFailed,
      results,
      diagnosisLoading,
      diagnosisFailed,
      diagnosis,
    } = this.props;

    if (resultsLoading || diagnosisLoading) {
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

    function DiagnosisButtons(props) {
      return (
        (!diagnosisFailed && diagnosis) ? (
            <Button color="primary" href={`/diagnosis/${result.id}`}>View Diagnosis</Button>
          ) :
          (
            <Button color="primary"
              href={`/diagnosis/${result.id}/create`}>Create Diagnosis</Button>
          )
      );
    }

    return (
      <div className="container">
        {
          // Check if user has completed the test
          result.time ? (
            <Box component="span" m={1}>
              <p>{JSON.stringify(result)}</p>
              <DiagnosisButtons />
            </Box>
          ) : (
            <Alert severity="error">
              <AlertTitle>Test not completed yet</AlertTitle>
              <p>No result available as test has <strong>not</strong> been
                 completed yet.</p>
            </Alert>
          )
        }

      </div>
    );
  }

}

ResultPage.propTypes = {
  /** An action creator */
  listAllResults: PropTypes.func.isRequired,
  /** A boolean to determine if the results are still being loaded (true: still loading, false: fully loaded) */
  resultsLoading: PropTypes.bool.isRequired,
  /** A boolean to determine if the users failed to be loaded the action creator(true: still loading or failed to load, false: successful load) */
  resultsFailed: PropTypes.bool,
  /** An array of results objects loaded by the action creator */
  results: PropTypes.array.isRequired,

  fetchDiagnosis: PropTypes.func.isRequired,
  diagnosisLoading: PropTypes.bool.isRequired,
  diagnosisFailed: PropTypes.bool,
  diagnosis: PropTypes.object,
};

const mapStateToProps = state => ({
  resultsLoading: selectResultsLoading(state),
  resultsFailed: selectResultsFailed(state),
  results: selectResults(state),
  diagnosisLoading: selectDiagnosisLoading(state),
  diagnosisFailed: selectDiagnosisFailed(state),
  diagnosis: selectDiagnosis(state),
});

const dispatchers = {
  listAllResults,
  fetchDiagnosis,
};

export default connect(mapStateToProps, dispatchers)(ResultPage);
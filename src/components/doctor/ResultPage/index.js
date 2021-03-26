import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';
import { Box, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';

class ResultPage extends Component {

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchResult(resultId);
  }

  render() {
    const {
      resultLoading,
      resultFailed,
      result,
    } = this.props;

    if (resultLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch results, redirect to not-found
    if (resultFailed) {
      return <Redirect to="/not-found" />;
    }

    function DiagnosisButtons(props) {
      return (
        (!result.diagnosis) ? (
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
  fetchResult: PropTypes.func.isRequired,
  resultLoading: PropTypes.bool.isRequired,
  resultFailed: PropTypes.bool,
  result: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  resultLoading: selectResultLoading(state),
  resultFailed: selectResultFailed(state),
  result: selectResult(state),
});

const dispatchers = {
  fetchResult,
};

export default connect(mapStateToProps, dispatchers)(ResultPage);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CircularProgress, Container } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';
import { fetchTimeGraph, selectGraph } from '../../../redux/ducks/graph';

class ResultPage extends Component {

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchResult(resultId);
    // this.props.fetchTimeGraph(2, 15);
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

    return (
      <Container>
        {
          // Check if user has completed the test
          result.time ? (
            <div>
              <p>{JSON.stringify(result)}</p>
              {
                (!result.diagnosis) ? (
                    <Button color="primary" href={`/diagnosis/${result.id}`}>Diagnosis</Button>
                  ) :
                  (
                    <Button color="primary" disabled>Diagnosis</Button>
                  )
              }
            </div>
          ) : (
            <Alert severity="error">
              <AlertTitle>Test not completed yet</AlertTitle>
              <p>No result available as test has <strong>not</strong> been
                 completed yet.</p>
              <Button color="primary"
                href={`/game/${result.id}`}>
                Do Test
              </Button>
            </Alert>
          )
        }
      </Container>
    );
  }

}

ResultPage.propTypes = {
  fetchTimeGraph: PropTypes.func.isRequired,
  fetchResult: PropTypes.func.isRequired,
  resultLoading: PropTypes.bool.isRequired,
  resultFailed: PropTypes.bool,
  result: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  resultLoading: selectResultLoading(state),
  resultFailed: selectResultFailed(state),
  result: selectResult(state),
  graph: selectGraph(state),
});

const dispatchers = {
  fetchResult,
  fetchTimeGraph
};

export default connect(mapStateToProps, dispatchers)(ResultPage);
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
import {
  fetchAccuracyGraph,
  selectAccGraph, selectAccGraphFailed,
  selectAccGraphLoading,
} from '../../../redux/ducks/accGraph';
import {
  fetchTimeGraph, selectTimeGraph,
  selectTimeGraphFailed,
  selectTimeGraphLoading,
} from '../../../redux/ducks/timeGraph';

class ResultPage extends Component {

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchResult(resultId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Result has been loaded
    if (!prevProps.result && this.props.result) {
      const bins = 10;
      const nodeNum = this.props.result.nodeNum;
      this.props.fetchAccuracyGraph(bins, nodeNum);
      this.props.fetchTimeGraph(bins, nodeNum);
    }
  }

  render() {
    const {
      resultLoading,
      resultFailed,
      accGraphLoading,
      accGraphFailed,
      timeGraphLoading,
      timeGraphFailed,
      result,
      accGraph,
      timeGraph,
    } = this.props;

    if (resultLoading || accGraphLoading || timeGraphLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch resources, redirect to not-found
    if (resultFailed || accGraphFailed || timeGraphFailed) {
      return <Redirect to="/not-found" />;
    }

    return (
      <Container>
        {
          // Check if user has completed the test
          result.time ? (
            <div>
              <p>{JSON.stringify(result)}</p>
              <p>{JSON.stringify(accGraph)}</p>
              <p>{JSON.stringify(timeGraph)}</p>
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

ResultPage.propType = {
  fetchResult: PropTypes.func.isRequired,
  fetchAccuracyGraph: PropTypes.func.isRequired,
  fetchTimeGraph: PropTypes.func.isRequired,
  resultLoading: PropTypes.bool.isRequired,
  resultFailed: PropTypes.bool,
  accGraphLoading: PropTypes.bool.isRequired,
  accGraphFailed: PropTypes.bool,
  timeGraphLoading: PropTypes.bool.isRequired,
  timeGraphFailed: PropTypes.bool,
  result: PropTypes.object.isRequired,
  accGraph: PropTypes.object.isRequired,
  timeGraph: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  resultLoading: selectResultLoading(state),
  resultFailed: selectResultFailed(state),
  accGraphLoading: selectAccGraphLoading(state),
  accGraphFailed: selectAccGraphFailed(state),
  timeGraphLoading: selectTimeGraphLoading(state),
  timeGraphFailed: selectTimeGraphFailed(state),
  result: selectResult(state),
  accGraph: selectAccGraph(state),
  timeGraph: selectTimeGraph(state),
});

const dispatchers = {
  fetchResult,
  fetchAccuracyGraph,
  fetchTimeGraph,
};

export default connect(mapStateToProps, dispatchers)(ResultPage);
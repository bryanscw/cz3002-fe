import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchDiagnosis,
  selectDiagnosis,
  selectDiagnosisFailed,
  selectDiagnosisLoading,
} from '../../../redux/ducks/diagnosis';
import { CircularProgress, Container } from '@material-ui/core';
import {
  fetchAccuracyGraph,
  fetchTimeGraph,
  selectGraph,
  selectGraphLoading,
} from '../../../redux/ducks/graph';
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';

class DiagnosisPage extends Component {

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchDiagnosis(resultId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.diagnosis && this.props.diagnosis) {
      // Diagnosis has been loaded
      this.props.fetchResult(this.props.diagnosis.result);
    } else if (!prevProps.result && this.props.result) {
      // Result has been loaded
      const bins = 10;
      const nodeNum = this.props.result.nodeNum;
      this.props.fetchAccuracyGraph(bins, nodeNum);
      this.props.fetchTimeGraph(bins, nodeNum);
    }
  }

  render() {

    const {
      diagnosisLoading,
      diagnosisFailed,
      resultLoading,
      resultFailed,
      accGraphLoading,
      accGraphFailed,
      timeGraphLoading,
      timeGraphFailed,
      diagnosis,
      result,
      accGraph,
      timeGraph,
    } = this.props;

    if (diagnosisLoading || resultLoading || accGraphLoading || timeGraphLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch resources, redirect to not-found
    if (diagnosisFailed || resultFailed || accGraphFailed || timeGraphFailed) {
      return <Redirect to="/not-found" />;
    }

    return (
      <Container>
        <p>{JSON.stringify(diagnosis)}</p>
        <p>{JSON.stringify(result)}</p>
        <p>{JSON.stringify(accGraph)}</p>
        <p>{JSON.stringify(timeGraph)}</p>
      </Container>
    );
  }

}

DiagnosisPage.propType = {
  fetchDiagnosis: PropTypes.func.isRequired,
  fetchResult: PropTypes.func.isRequired,
  fetchAccuracyGraph: PropTypes.func.isRequired,
  fetchTimeGraph: PropTypes.func.isRequired,
  diagnosisLoading: PropTypes.bool.isRequired,
  diagnosisFailed: PropTypes.bool,
  accGraphLoading: PropTypes.bool.isRequired,
  accGraphFailed: PropTypes.bool,
  timeGraphLoading: PropTypes.bool.isRequired,
  timeGraphFailed: PropTypes.bool,
  diagnosis: PropTypes.object.isRequired,
  accGraph: PropTypes.object.isRequired,
  timeGraph: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  diagnosisLoading: selectDiagnosisLoading(state),
  diagnosisFailed: selectDiagnosisFailed(state),
  resultLoading: selectResultLoading(state),
  resultFailed: selectResultFailed(state),
  accGraphLoading: selectGraphLoading(state),
  accGraphFailed: selectGraphLoading(state),
  timeGraphLoading: selectGraphLoading(state),
  timeGraphFailed: selectGraphLoading(state),
  diagnosis: selectDiagnosis(state),
  result: selectResult(state),
  accGraph: selectGraph(state),
  timeGraph: selectGraph(state),
});

const dispatchers = {
  fetchDiagnosis,
  fetchResult,
  fetchAccuracyGraph,
  fetchTimeGraph,
};

export default connect(mapStateToProps, dispatchers)(DiagnosisPage);
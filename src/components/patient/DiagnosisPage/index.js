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
import { CircularProgress } from '@material-ui/core';

class DiagnosisPage extends Component {

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchDiagnosis(resultId);
  }

  render() {
    const {
      diagnosisLoading,
      diagnosisFailed,
      diagnosis,
    } = this.props;

    if (diagnosisLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch results, redirect to not-found
    if (diagnosisFailed) {
      return <Redirect to="/not-found" />;
    }

    return (
      <div className="container">
        <p>{JSON.stringify(diagnosis)}</p>
      </div>
    );
  }

}

DiagnosisPage.propType = {
  fetchDiagnosis: PropTypes.func.isRequired,
  diagnosisLoad: PropTypes.bool.isRequired,
  diagnosisFailed: PropTypes.bool,
  diagnosis: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  diagnosisLoading: selectDiagnosisLoading(state),
  diagnosisFailed: selectDiagnosisFailed(state),
  diagnosis: selectDiagnosis(state),
});

const dispatchers = {
  fetchDiagnosis,
};

export default connect(mapStateToProps, dispatchers)(DiagnosisPage);
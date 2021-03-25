import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  listAllPatients,
  selectPatients,
  selectPatientsFailed,
  selectPatientsLoading,
} from '../../../redux/ducks/result';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class CreateTestPage extends Component {
  componentDidMount() {
    console.log('Hello');
    this.props.listAllPatients(this.state);
  }

  render() {
    const {
      patientsLoading,
      patientsFailed,
      patients,
    } = this.props;

    if (patientsLoading) {
      return <CircularProgress />;
    }

    if (patientsFailed) {
      return <Redirect to="/not-found" />;
    }

    return (
      <div>
        <p>{JSON.stringify(patients)}</p>
      </div>
    );
  }

}

CreateTestPage.propTypes = {
  listAllPatients: PropTypes.func.isRequired,
  patientsLoading: PropTypes.bool.isRequired,
  patientsFailed: PropTypes.bool,
  patients: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  patientsLoading: selectPatientsLoading(state),
  patientsFailed: selectPatientsFailed(state),
  patients: selectPatients(state),
});

const dispatchers = {
  listAllPatients,
};

export default connect(mapStateToProps, dispatchers)(CreateTestPage);
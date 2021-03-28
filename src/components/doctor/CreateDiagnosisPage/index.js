import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { Select, TextField } from 'final-form-material-ui';
import { createDiagnosis } from '../../../redux/ducks/diagnosis';
import {
  listAllResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import PropTypes from 'prop-types';
import { CircularProgress, Container, Grid, MenuItem, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';

class CreateDiagnosisPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultId: null,
      label: null,
      description: null,
    };
  }

  componentDidMount() {
    this.setState({ resultId: parseInt(this.props.match.params.resultId) });
    this.props.listAllResults(this.state);
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
          marginTop: 200,
          marginLeft: 860,
        }} />;
    }

    if (resultsFailed) {
      return <Redirect to="/not-found" />;
    }

    let result = results.find(o => o.id === this.state.resultId);

    // If no such result is found
    if (!result) {
      return <Redirect to="/not-found" />;
    }

    const onSubmit = async values => {
      this.props.createDiagnosis(result.id, {
        label: values.label,
        description: values.description,
      });
      window.location.replace(`/diagnosis/${result.id}`);
    };

    const validate = values => {
      const errors = {};
      if (!values.label) {
        errors.label = 'Required';
      }
      if (!values.description) {
        errors.description = 'Required';
      }
      return errors;
    };

    function DiagnosisForm(props) {
      return (
        <div style={{
          padding: 16,
          margin: 'auto',
          maxWidth: 600,
        }}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({
              handleSubmit,
              submitting,
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="label"
                        component={Select}
                        label="Select a severity"
                        formControlProps={{ fullWidth: true }}
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Moderate">Moderate</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="description"
                        component={TextField}
                        multiline
                        label="Additional information about diagnosis"
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          />
        </div>
      );
    }

    return (
      <Container>
        {
          result.time ? result.diagnosis ? (
            <Alert severity="warning">
              <AlertTitle>A diagnosis has already been created</AlertTitle>
              <p>A diagnosis has already been created. Click the button below to see it.</p>
              <Button color="primary"
                href={`/diagnosis/${result.id}`}>
                View Diagnosis
              </Button>
            </Alert>
          ) : <DiagnosisForm /> : (
            <Alert severity="error">
              <AlertTitle>Test not been completed yet</AlertTitle>
              <p><strong>Not</strong> allowed to create diagnosis until test has been completed.</p>
            </Alert>
          )
        }
      </Container>
    );
  }

}

CreateDiagnosisPage.propTypes = {
  listAllResults: PropTypes.func.isRequired,
  resultsLoading: PropTypes.bool.isRequired,
  resultsFailed: PropTypes.bool,
  results: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  resultsLoading: selectResultsLoading(state),
  resultsFailed: selectResultsFailed(state),
  results: selectResults(state),
});

const dispatchers = {
  listAllResults,
  createDiagnosis,
};

export default connect(mapStateToProps, dispatchers)(CreateDiagnosisPage);
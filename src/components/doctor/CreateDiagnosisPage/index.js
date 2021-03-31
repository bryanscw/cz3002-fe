import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { Select, TextField } from 'final-form-material-ui';
import { createDiagnosis } from '../../../redux/ducks/diagnosis';
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';
import PropTypes from 'prop-types';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Grid,
  Link,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
      return <CircularProgress align="center"
        style={{
          marginTop: 190,
          marginLeft: 690,
        }} />;
    }

    if (resultFailed) {
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
          <Breadcrumbs style={{ marginLeft: 1 }} separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/results">
              Result
            </Link>
            <Link color="inherit" href={`/result/${result.id}`}>
              {result.id}
            </Link>
            <Typography color="textPrimary"> Create Diagnosis</Typography>
          </Breadcrumbs>
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
            <Box>
              <Alert severity="error">
                <AlertTitle>Test has not been completed yet</AlertTitle>
                <p><strong>Not</strong> allowed to create diagnosis until test has been completed.
                </p>
              </Alert>
              <Button variant="contained"
                style={{
                  width: 300,
                  height: 50,
                  fontSize: 17,
                  marginTop: 50,
                  marginBottom: 30,
                  marginLeft: 460,
                }}
                color="primary"
                href="/diagnosis/pending">
                <ArrowBackIosIcon /> Back to Diagnosis Page
              </Button>
            </Box>
          )
        }
      </Container>
    );
  }

}

CreateDiagnosisPage.propType = {
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
  createDiagnosis,
};

export default connect(mapStateToProps, dispatchers)(CreateDiagnosisPage);
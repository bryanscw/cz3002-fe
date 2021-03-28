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
import {
  Breadcrumbs,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import Moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  paper: {
    padding: 50,
    justifyContent: 'center',
    margin: 'auto',
  },
});

class DiagnosisPage extends Component {
  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchDiagnosis(resultId);
  }

  render() {
    const {
      classes,
      diagnosisLoading,
      diagnosisFailed,
      diagnosis,
    } = this.props;

    if (diagnosisLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch resources, redirect to not-found
    // Some check is done in componentDidMount, do a check again to be safe
    if (diagnosisFailed) {
      return <Redirect to="/not-found" />;
    }

    const labels = ['High', 'Moderate', 'Low'];

    return (
      <Container>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard">
            Results
          </Link>
          <Link color="inherit" href={`/result/${diagnosis.result}`}>
            {diagnosis.result}
          </Link>
          <Typography color="textPrimary">Diagnosis</Typography>
        </Breadcrumbs>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography gutterBottom>Created By</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {diagnosis.createdBy}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Created Date</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {Moment(diagnosis.createdDate).format('DD-MM-YYYY')}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Last Modified By</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {diagnosis.lastModifiedBy}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Last Modified Date</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {Moment(diagnosis.lastModifiedDate).format('DD-MM-YYYY')}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Label</Typography>
              <div>
                {
                  labels.map(
                    label => (
                      label === diagnosis.label
                        ?
                        <Chip key={label} className={classes.chip} label={label} color="primary" />
                        :
                        <Chip key={label} className={classes.chip} label={label} />
                    ),
                  )
                }
              </div>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Diagnosis Description</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {diagnosis.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

}

DiagnosisPage.propType = {
  fetchDiagnosis: PropTypes.func.isRequired,
  diagnosisLoading: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, dispatchers)(withStyles(styles)(DiagnosisPage));
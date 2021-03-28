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
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';
import {
  fetchAccuracyGraph,
  selectAccGraph,
  selectAccGraphFailed,
  selectAccGraphLoading,
} from '../../../redux/ducks/accGraph';
import {
  fetchTimeGraph,
  selectTimeGraph,
  selectTimeGraphFailed,
  selectTimeGraphLoading,
} from '../../../redux/ducks/timeGraph';
import { Bar } from 'react-chartjs-2';
import Moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  graph: {
    width: '50%',
    float: 'left',
    marginBottom: 30,
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
    } else if (!this.props.diagnosisLoading && this.props.diagnosisFailed) {
      this.props.history.push('/not-found');
    } else if (!this.props.resultLoading && this.props.resultFailed) {
      this.props.history.push('/not-found');
    }
  }

  render() {

    const {
      classes,
      diagnosisLoading,
      diagnosisFailed,
      resultLoading,
      resultFailed,
      accGraphLoading,
      accGraphFailed,
      timeGraphLoading,
      timeGraphFailed,
      diagnosis,
      accGraph,
      timeGraph,
    } = this.props;

    if (diagnosisLoading || resultLoading || accGraphLoading || timeGraphLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch resources, redirect to not-found
    // Some check is done in componentDidMount, do a check again to be safe
    if (diagnosisFailed || resultFailed || accGraphFailed || timeGraphFailed) {
      return <Redirect to="/not-found" />;
    }
    const aGraph = {
      labels: accGraph.labels,
      datasets: [
        {
          label: 'accuracy',
          data: accGraph.data,
          fill: true,
          lineTension: 0,
          backgroundColor: '#115293',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    const tGraph = {
      labels: timeGraph.labels,
      datasets: [
        {
          label: 'time',
          data: timeGraph.data,
          fill: true,
          lineTension: 0,
          backgroundColor: '#115293',
          borderColor: 'rgba(75,192,192,1)',
        },

      ],
    };

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
          <div className={classes.graph}>
            <Bar data={aGraph} />
          </div>
          <div className={classes.graph}>
            <Bar data={tGraph} />
          </div>
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
                      label === diagnosis.label ?
                        <Chip className={classes.chip} label={label} color="primary" /> :
                        <Chip className={classes.chip} label={label} />
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
  result: PropTypes.object.isRequired,
  accGraph: PropTypes.object.isRequired,
  timeGraph: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  diagnosisLoading: selectDiagnosisLoading(state),
  diagnosisFailed: selectDiagnosisFailed(state),
  resultLoading: selectResultLoading(state),
  resultFailed: selectResultFailed(state),
  accGraphLoading: selectAccGraphLoading(state),
  accGraphFailed: selectAccGraphFailed(state),
  timeGraphLoading: selectTimeGraphLoading(state),
  timeGraphFailed: selectTimeGraphFailed(state),
  diagnosis: selectDiagnosis(state),
  result: selectResult(state),
  accGraph: selectAccGraph(state),
  timeGraph: selectTimeGraph(state),
});

const dispatchers = {
  fetchDiagnosis,
  fetchResult,
  fetchAccuracyGraph,
  fetchTimeGraph,
};

export default connect(mapStateToProps, dispatchers)(withStyles(styles)(DiagnosisPage));
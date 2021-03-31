import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import { calculateAge } from '../../../utils/calculateAge';
import { Bar } from 'react-chartjs-2';
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
import { getBarColors } from '../../../utils/getBarColors';
import { Alert, AlertTitle } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  circularProgress: {
    marginTop:190,
    marginLeft: '50%'
  },
  breadcrumbs: {
    marginLeft: 1,
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
  divDiagnosis: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
  },
});

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
    } else if (!this.props.resultLoading && this.props.resultFailed) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const {
      classes,
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
      return <CircularProgress className={classes.circularProgress} align="center" />;
    }

    // If failed to fetch resources, redirect to not-found
    // Some check is done in componentDidMount, do a check again to be safe
    if (resultFailed || accGraphFailed || timeGraphFailed) {
      return <Redirect to="/not-found" />;
    }
    const aColors = getBarColors(accGraph, result.accuracy, '#115293', '#ff7961');
    const bColors = getBarColors(timeGraph, result.time, '#115293', '#ff7961');

    const aGraph = {
      labels: accGraph.labels,
      datasets: [
        {
          label: 'accuracy',
          data: accGraph.data,
          fill: true,
          lineTension: 0,
          backgroundColor: aColors,
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
          backgroundColor: bColors,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    return (
      <Container>
        {
          // Check if user has completed the test
          result.time ? (
            <div>
              <Breadcrumbs className={classes.breadcrumbs} separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/dashboard">
                  Result
                </Link>
                <Typography color="textPrimary">{result.id}</Typography>
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
                    <Typography gutterBottom>Patient</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {result.user.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography gutterBottom>Patient Email</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {result.user.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography gutterBottom>Age</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {calculateAge(result.user.dob)}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography gutterBottom>Accuracy</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {result.accuracy}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography gutterBottom>Time</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {result.time}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography gutterBottom>Number Of Nodes</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {result.nodeNum}
                    </Typography>
                  </Grid>
                </Grid>


                {
                  (result.diagnosis) ? (
                      <div className={classes.divDiagnosis}>
                        <Button color="primary"
                          variant="contained"
                          href={`/diagnosis/${result.id}`}>Diagnosis</Button>
                      </div>
                    ) :
                    (
                      <div className={classes.divDiagnosis}>
                        <Button color="primary" variant="contained" disabled>Diagnosis</Button>
                      </div>
                    )
                }
              </Paper>
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

export default connect(mapStateToProps, dispatchers)(withStyles(styles)(ResultPage));
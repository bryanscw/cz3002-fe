import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import {
  fetchAccuracyGraph,
  selectAccGraph,
  selectAccGraphFailed,
  selectAccGraphLoading,
} from '../../../redux/ducks/accGraph';
import { Bar } from 'react-chartjs-2';
import { calculateAge } from '../../../utils/calculateAge';
import {
  fetchTimeGraph,
  selectTimeGraph,
  selectTimeGraphFailed,
  selectTimeGraphLoading,
} from '../../../redux/ducks/timeGraph';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { withStyles } from '@material-ui/core/styles';
import { getBarColors } from '../../../utils/getBarColors';

const styles = theme => ({
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
  divDiagnosisButtons: {
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
      return <CircularProgress align="center"
        style={{
          marginTop: 200,
          marginLeft: 860,
        }} />;
    }

    // If failed to fetch resources, redirect to not-found
    // Some check is done in componentDidMount, do a check again to be safe
    if (resultFailed || accGraphFailed || timeGraphFailed) {
      return <Redirect to="/not-found" />;
    }

    function DiagnosisButtons(props) {
      return (
        (result.diagnosis) ? (
            <Button color="primary"
              variant="contained"
              href={`/diagnosis/${result.id}`}>View Diagnosis</Button>
          ) :
          (
            <Button color="primary" variant="contained"
              href={`/diagnosis/${result.id}/create`}>Create Diagnosis</Button>
          )
      );
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
            <Box component="span" m={1}>
              <Breadcrumbs className={classes.breadcrumbs} separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/results">
                  Result
                </Link>
                <Typography color="textPrimary">{result.id} </Typography>
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


                <div className={classes.divDiagnosisButtons}>
                  <DiagnosisButtons />
                </div>
              </Paper>
            </Box>
          ) : (
            <Box>
              <Alert severity="error">
                <AlertTitle>Test not been completed yet</AlertTitle>
                <p>No result available as test has <strong>not</strong> been
                   completed yet.</p>
              </Alert>
              <Button variant="contained"
                style={{
                  width: 290,
                  height: 50,
                  fontSize: 17,
                  marginTop: 50,
                  marginBottom: 30,
                  marginLeft: 460,
                }}
                color="primary"
                href="/results">
                <ArrowBackIosIcon /> Back to Result Page
              </Button>
            </Box>
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
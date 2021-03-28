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
  Divider,
  Link,
  Paper,
  Typography,
  GridList,
  Grid,
  GridListTile
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
import { faHospitalUser,faEnvelopeOpenText,faIdCard,faUserCheck,faStopwatch,faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
    // for (var i=0;i<accGraph.labels.length;i++){
    //    if (accGraph.labels[i][0] == result.accuracy || accGraph.labels[i][1] == result.accuracy) {
    //     accGraph.backgroundColor ="#000000";
    //    }
    // }
    
 
    return (
      <Container>
        {
          // Check if user has completed the test
          result.time ? (
            <Box component="span" m={1}>
              <Breadcrumbs style={{ marginLeft: 1 }} separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/results">
                  Result
                </Link>
                <Typography color="textPrimary"> Result ID: {result.id} Detail</Typography>
              </Breadcrumbs>

              <Paper style={{
                padding: 50,
                justifyContent: 'center',
                margin: 'auto',
              }}>
                <h1 style={{ textAlign: 'center' }}>Result</h1>
                <div  style={{ width:'50%' ,float:'left',marginBottom:30}} >
                  
                  <Bar data={aGraph} />
                
                </div>
                <div style={{ width:'50%', float:'right',marginBottom:30}}>
                  <Bar  data={tGraph} />
                
                </div>
                <GridList cellHeight={110}   cols={2}>
                  <GridListTile  style={{width:'5%'}} >
                      <Grid item  xs={12}>

                      <FontAwesomeIcon icon={faHospitalUser} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
                      </Grid>
                  
                  </GridListTile>
                  <GridListTile style={{width:'45%'}} >
                      <Grid item  xs={12}>

                      <Typography style={{fontSize: 20,fontWeight: 600,}}>Patient : </Typography>
                      <Typography style={{marginTop: 10,fontSize: 18,}}> {result.user.name}</Typography>
                      </Grid>
                  
                  </GridListTile>

                  <GridListTile  style={{width:'5%'}} >
                      <Grid item  xs={12}>

                      <FontAwesomeIcon icon={faEnvelopeOpenText} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
                      </Grid>
                  
                  </GridListTile>
                  <GridListTile style={{width:'45%'}} >
                      <Grid item  xs={12}>

                      <Typography style={{fontSize: 20,fontWeight: 600,}}>Patient Email : </Typography>
                      <Typography style={{marginTop: 10,fontSize: 18,}}> {result.user.email}</Typography>
                      </Grid>
                  
                  </GridListTile>

                  <GridListTile  style={{width:'5%'}} >
                      <Grid item  xs={12}>

                      <FontAwesomeIcon icon={faIdCard} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
                      </Grid>
                  
                  </GridListTile>
                  <GridListTile style={{width:'45%'}} >
                      <Grid item  xs={12}>

                      <Typography style={{fontSize: 20,fontWeight: 600,}}>Age : </Typography>
                      <Typography style={{marginTop: 10,fontSize: 18,}}>  {calculateAge(result.user.dob)}</Typography>
                      </Grid>
                  
                  </GridListTile>

                  <GridListTile  style={{width:'5%'}} >
                      <Grid item  xs={12}>

                      <FontAwesomeIcon icon={faUserCheck} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
                      </Grid>
                  
                  </GridListTile>
                  <GridListTile style={{width:'45%'}} >
                      <Grid item  xs={12}>

                      <Typography style={{fontSize: 20,fontWeight: 600,}}>Accuracy : </Typography>
                      <Typography style={{marginTop: 10,fontSize: 18,}}>{result.accuracy}</Typography>
                      </Grid>
                  
                  </GridListTile>

                  
                  <GridListTile  style={{width:'5%'}} >
                      <Grid item  xs={12}>

                      <FontAwesomeIcon icon={faStopwatch} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
                      </Grid>
                  
                  </GridListTile>
                  <GridListTile style={{width:'45%'}} >
                      <Grid item  xs={12}>

                      <Typography style={{fontSize: 20,fontWeight: 600,}}>Time : </Typography>
                      <Typography style={{marginTop: 10,fontSize: 18,}}>{result.time}</Typography>
                      </Grid>
                  
                  </GridListTile>

                  <GridListTile  style={{width:'5%'}} >
                      <Grid item  xs={12}>

                      <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
                      </Grid>
                  
                  </GridListTile>
                  <GridListTile style={{width:'45%'}} >
                      <Grid item  xs={12}>

                      <Typography style={{fontSize: 20,fontWeight: 600,}}>Number Of Nodes : </Typography>
                      <Typography style={{marginTop: 10,fontSize: 18,}}>{result.nodeNum}</Typography>
                      </Grid>
                  
                  </GridListTile>
                </GridList>

              </Paper>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
              }}>
                <DiagnosisButtons />
              </div>

            </Box>
          ) : (
            <Alert severity="error">
              <AlertTitle>Test not been completed yet</AlertTitle>
              <p>No result available as test has <strong>not</strong> been
                 completed yet.</p>
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
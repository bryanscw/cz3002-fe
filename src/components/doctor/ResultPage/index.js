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
import { Box, CircularProgress, Container,Paper ,Divider,Typography,Breadcrumbs,Link} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import {
  fetchAccuracyGraph,
  selectAccGraph,
  selectAccGraphFailed,
  selectAccGraphLoading,
} from '../../../redux/ducks/accGraph';

import { Bar } from "react-chartjs-2";
import { calculateAge } from '../../../utils/calculateAge';
import {
fetchTimeGraph,
  selectTimeGraph,
  selectTimeGraphFailed,
  selectTimeGraphLoading,
} from '../../../redux/ducks/timeGraph';

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
    if (resultFailed || accGraphFailed || timeGraphFailed) {
      return <Redirect to="/not-found" />;
    }

    function DiagnosisButtons(props) {
      return (
        (result.diagnosis) ? (
            <Button color="primary" variant="contained" href={`/diagnosis/${result.id}`}>View Diagnosis</Button>
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
          label: "accuracy",
          data: accGraph.data,
          fill: true,
          lineTension: 0,
          backgroundColor: "#115293",
          borderColor: "rgba(75,192,192,1)"
        },
        
      ],
    
    };
    const tGraph = {
      labels: timeGraph.labels,
      datasets: [
        {
          label: "time",
          data: timeGraph.data,
          fill: true,
          lineTension: 0,
          backgroundColor: "#115293",
          borderColor: "rgba(75,192,192,1)"
        },
        
      ],
    
    };
   
    return (
      <Container style={{width:900}}>
        {
          // Check if user has completed the test
          result.time ? (
            <Box component="span" m={1}>
              <Breadcrumbs style={{marginLeft:1}} separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/results" >
                Result
                </Link>
                <Typography color="textPrimary">Result Detail</Typography>
              </Breadcrumbs>
              
              <Paper style={{ padding:50, justifyContent: "center",margin:"auto",width:850}}>
                <h1 style={{textAlign: "center"}}>Result</h1>
                <div>
                 
                      <Bar data={aGraph} />
                </div>
                <div>
                 
                 <Bar data={tGraph} />
           </div>
              
                <label>
                    <div style={{marginTop: 30}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Patient </Typography></div>
                    <div><Typography style={{marginTop: 10,fontSize:18}} > {result.user.name}</Typography></div>
                    <Divider />
                </label>
                <label>
                    <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Patient Email  </Typography></div>
                    <div><Typography style={{marginTop: 10,fontSize:18}} > {result.user.email}</Typography></div>
                    <Divider />
                </label>
                <label>
                    <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Age </Typography></div>
                    <div><Typography style={{marginTop: 10,fontSize:18}} > {calculateAge(result.user.dob)}</Typography></div>
                    <Divider />
                </label>
                <label>
                    <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Accuracy  </Typography></div>
                    <div><Typography style={{marginTop: 10,fontSize:18}} > {result.accuracy}</Typography></div>
                    <Divider />
                </label>
                <label>
                    <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Time </Typography></div>
                    <div><Typography style={{marginTop: 10,fontSize:18}} > {result.time}</Typography></div>
                    <Divider />
                </label>
                <label>
                    <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Number Of Nodes</Typography></div>
                    <div><Typography style={{marginTop: 10,fontSize:18}} > {result.nodeNum}</Typography></div>
                    <Divider />
                </label>

              </Paper>
         
              <div style={{ display: 'flex', justifyContent: 'center',marginTop:20 }}>
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
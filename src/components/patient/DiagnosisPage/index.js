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
import { CircularProgress, Container,Paper,Typography,Divider ,Link,Breadcrumbs} from '@material-ui/core';
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';
import {
  fetchAccuracyGraph, selectAccGraph,
  selectAccGraphFailed,
  selectAccGraphLoading,
} from '../../../redux/ducks/accGraph';
import {
  fetchTimeGraph,
  selectTimeGraph, selectTimeGraphFailed,
  selectTimeGraphLoading,
} from '../../../redux/ducks/timeGraph';
import { Bar } from "react-chartjs-2";
import Moment from 'moment';

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
    }
  }

  render() {

    const {
      diagnosisLoading,
      diagnosisFailed,
      resultLoading,
      resultFailed,
      accGraphLoading,
      accGraphFailed,
      timeGraphLoading,
      timeGraphFailed,
      diagnosis,
      result,
      accGraph,
      timeGraph,
    } = this.props;

    if (diagnosisLoading || resultLoading || accGraphLoading || timeGraphLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch resources, redirect to not-found
    if (diagnosisFailed || resultFailed || accGraphFailed || timeGraphFailed) {
      return <Redirect to="/not-found" />;
    }
    const barData = {
      labels: accGraph.labels,
      datasets: [
        {
          label: "Accuracy",
          data: accGraph.data,
          fill: true,
          lineTension: 0,
          backgroundColor: "#115293",
          borderColor: "rgba(75,192,192,1)"
        },
        
      ],
      labels: timeGraph.labels,
      datasets: [
        {
          label: "Time",
          data: timeGraph.data,
          fill: true,
          lineTension: 0,
          backgroundColor: "#115133",
          borderColor: "rgba(75,192,192,1)"
        },
        
      ]
    };
    return (
      <Container style={{width:900}}>
        <Breadcrumbs style={{marginLeft:1}} separator="›" aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" >
           Result
          </Link>
          <Link color="inherit" href={`/result/${diagnosis.result}`}>
           Result Detail
          </Link>
          <Typography color="textPrimary">Diagnosis</Typography>
        </Breadcrumbs>
        <Paper style={{ padding:50, justifyContent: "center",margin:"auto",width:850}}>
         <h1 style={{textAlign: "center"}}>Diagnosis</h1>
         <div>
              <Bar data={barData} />
         </div>
         
         <label>
            <div style={{marginTop: 30}}><Typography  style={{fontSize: 20,fontWeight: 600}} >CreatedBy :  </Typography></div>
            <div><Typography style={{marginTop: 10,fontSize:18}} > {diagnosis.createdBy}</Typography></div>
            <Divider />
         </label>
         <label>
            <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Created Date:    </Typography></div>
            <div><Typography style={{marginTop: 10,fontSize:18}} > {Moment(diagnosis.createdDate).format('DD-MM-YYYY')}</Typography></div>
            <Divider />
         </label>
         <label>
            <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Category :   </Typography></div>
            <div><Typography style={{marginTop: 10,fontSize:18}} > {diagnosis.label}</Typography></div>
            <Divider />
         </label>
         <label>
            <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >Comments : </Typography></div>
            <div><Typography style={{marginTop: 10,fontSize:18}} > {diagnosis.description}</Typography></div>
            <Divider />
         </label>
         <label>
            <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >last modified by:   </Typography></div>
            <div><Typography style={{marginTop: 10,fontSize:18}} > {diagnosis.lastModifiedBy}</Typography></div>
            <Divider />
         </label>
         <label>
            <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}} >last modified date:   </Typography></div>
            <div><Typography style={{marginTop: 10,fontSize:18}} > {Moment(diagnosis.lastModifiedDate).format('DD-MM-YYYY')}</Typography></div>
            <Divider />
         </label>

         </Paper>
        {/* <p>{JSON.stringify(accGraph)}</p>
        <p>{JSON.stringify(timeGraph)}</p> */}
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

export default connect(mapStateToProps, dispatchers)(DiagnosisPage);
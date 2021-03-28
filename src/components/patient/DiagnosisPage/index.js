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
  CircularProgress,
  Container,
  Link,
  Paper,
  Typography,
  GridList,
  GridListTile,
  Grid
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
import { faUserMd,faCalendarCheck,faUserTag,faStethoscope} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    return (
      <Container>
        <Breadcrumbs style={{ marginLeft: 1 }} separator="›" aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard">
            Result
          </Link>
          <Link color="inherit" href={`/result/${diagnosis.result}`}>
          Result ID: {diagnosis.result} Detail 
          </Link>
          <Typography color="textPrimary">Diagnosis</Typography>
        </Breadcrumbs>
        <Paper style={{
          padding: 50,
          justifyContent: 'center',
          margin: 'auto',
        }}>
          <h1 style={{ textAlign: 'center' }}>Diagnosis</h1>
          <div  style={{ width:'50%' ,float:'left',marginBottom:30}} >
            <Bar data={aGraph} />
           
          </div>
          <div style={{ width:'50%', float:'right',marginBottom:30}}>
            <Bar  data={tGraph} />
           
          </div>
        
          <GridList cellHeight={110}   cols={2}>
          <GridListTile  style={{width:'5%'}} >
              <Grid item  xs={12}>

              <FontAwesomeIcon icon={faUserMd} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
              </Grid>
           
          </GridListTile>
          <GridListTile style={{width:'45%'}} >
              <Grid item  xs={12}>

              <Typography style={{fontSize: 20,fontWeight: 600,}}>CreatedBy : </Typography>
              <Typography style={{marginTop: 10,fontSize: 18,}}> {diagnosis.createdBy}</Typography>
              </Grid>
           
          </GridListTile>

          <GridListTile style={{width:'5%'}} >
              <Grid item  xs={12}  >

              <FontAwesomeIcon icon={faCalendarCheck} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
              </Grid>
           
          </GridListTile>
          <GridListTile style={{width:'45%'}}>
              <Grid item  xs={12}>

              <Typography style={{fontSize: 20,fontWeight: 600,}}>Created Date:  </Typography>
              <Typography style={{marginTop: 10,fontSize: 18,}}>  {Moment(diagnosis.createdDate).format('DD-MM-YYYY')}</Typography>
              </Grid>
              
          </GridListTile>

          <GridListTile style={{width:'5%'}} >
              <Grid item  xs={12}  >

              <FontAwesomeIcon icon={faUserTag} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
              </Grid>
           
          </GridListTile>
          <GridListTile style={{width:'45%'}}>
              <Grid item  xs={12}>

              <Typography style={{fontSize: 20,fontWeight: 600,}}>Category :  </Typography>
              <Typography style={{marginTop: 10,fontSize: 18,}}> {diagnosis.label}</Typography>
              </Grid>
              
          </GridListTile>

          <GridListTile style={{width:'5%'}} >
              <Grid item  xs={12}  >

              <FontAwesomeIcon icon={faStethoscope} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
              </Grid>
           
          </GridListTile>
          <GridListTile style={{width:'45%'}}>
              <Grid item  xs={12}>

              <Typography style={{fontSize: 20,fontWeight: 600,}}>Comment:  </Typography>
              <Typography style={{marginTop: 10,fontSize: 18,}}> {diagnosis.description}</Typography>
              </Grid>
              
          </GridListTile>

         
          <GridListTile style={{width:'5%'}} >
              <Grid item  xs={12}  >

              <FontAwesomeIcon icon={faUserMd} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
              </Grid>
           
          </GridListTile>
          <GridListTile style={{width:'45%'}}>
              <Grid item  xs={12}>

              <Typography style={{fontSize: 20,fontWeight: 600,}}>last modified by: </Typography>
              <Typography style={{marginTop: 10,fontSize: 18,}}> {diagnosis.lastModifiedBy}</Typography>
              </Grid>
             
          </GridListTile>

          <GridListTile style={{width:'5%'}} >
              <Grid item  xs={12}  >

              <FontAwesomeIcon icon={faCalendarCheck} style={{color: "#115293",marginTop:10}}size = '3x' variant="contained" color="primary" />
              </Grid>
           
          </GridListTile>
          <GridListTile style={{width:'45%'}}>
              <Grid item  xs={12}>

              <Typography style={{fontSize: 20,fontWeight: 600,}}>last modified date: </Typography>
              <Typography style={{marginTop: 10,fontSize: 18,}}> {Moment(diagnosis.lastModifiedDate).format('DD-MM-YYYY')}</Typography>
              </Grid>
             
          </GridListTile>


          </GridList>

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

export default connect(mapStateToProps, dispatchers)(DiagnosisPage);
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchDiagnosis,
  selectDiagnosis,
  selectDiagnosisFailed,
  selectDiagnosisLoading,
  updateDiagnosis,
} from '../../../redux/ducks/diagnosis';
import {
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Paper,Typography,Divider,Breadcrumbs,Link,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Moment from 'moment';

import {
  fetchAccuracyGraph,
  selectAccGraph,
  selectAccGraphFailed,
  selectAccGraphLoading,
} from '../../../redux/ducks/accGraph';

import { Bar } from "react-chartjs-2";
import { fetchResult,selectResult, selectResultFailed, selectResultLoading } from '../../../redux/ducks/result';
import {
  fetchTimeGraph,
  selectTimeGraph,
  selectTimeGraphFailed,
  selectTimeGraphLoading,
} from '../../../redux/ducks/timeGraph';


class DiagnosisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      label: null,
      description: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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

    const initialState = {
      open: false,
      label: diagnosis.label,
      description: diagnosis.description,
    };

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
         <Breadcrumbs style={{marginLeft:1}} separator="›" aria-label="breadcrumb">
          <Link color="inherit" href="/results" >
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
              <Bar data={aGraph} />
         </div>
         <div>
              <Bar data={tGraph} />
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
      
        {/* <p>{JSON.stringify(result)}</p> */}
         
        {/* <p>{JSON.stringify(accGraph)}</p>
        <p>{JSON.stringify(timeGraph)}</p> */}
        <div style={{ display: 'flex', justifyContent: 'center',marginTop:20 }}>
          <Button variant="contained" color="primary"
            onClick={() => {
              this.setState({
                open: true,
                label: diagnosis.label,
                description: diagnosis.description,
              });
            }}>
            Edit Diagnosis
          </Button>
        </div>

        <Dialog
          fullWidth
          open={this.state.open}
          onClose={() => {
            this.setState(initialState);
          }}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="max-width-dialog-title">
            Modify Diagnosis
          </DialogTitle>
          <form noValidate>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                select
                margin="dense"
                id="label"
                name="label"
                type="text"
                helperText="Please input the severity"
                value={this.state.label}
                onChange={this.handleChange}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </DialogContent>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                multiline
                margin="dense"
                id="description"
                name="description"
                type="text"
                helperText="Please input the description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </DialogContent>
          </form>
          <DialogActions>
            <Button onClick={() => {
              this.setState(initialState);
            }} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {

              if (!this.state.label) {
                alert('Label cannot be empty!');
              } else if (!this.state.description) {
                alert('Description cannot be empty!');
              } else {
                this.setState(initialState);
                this.props.updateDiagnosis(
                  diagnosis.result,
                  {
                    label: this.state.label,
                    description: this.state.description,
                  });
                window.location.replace(`/diagnosis/${diagnosis.result}`);
              }

            }} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

}

DiagnosisPage.propType = {
  fetchDiagnosis: PropTypes.func.isRequired,
  updateDiagnosis: PropTypes.func.isRequired,
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
  result:PropTypes.object.isRequired,
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
  result:selectResult(state),
  accGraph: selectAccGraph(state),
  timeGraph: selectTimeGraph(state),
});

const dispatchers = {
  fetchDiagnosis,
  fetchResult,
  updateDiagnosis,
  fetchAccuracyGraph,
  fetchTimeGraph,
};

export default connect(mapStateToProps, dispatchers)(DiagnosisPage);
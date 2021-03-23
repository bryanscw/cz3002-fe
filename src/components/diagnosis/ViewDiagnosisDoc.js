import {BrowserRouter as Router} from "react-router-dom";
import React, { Component } from "react";

import "./Diagnosis.css";
import {fetchDiagnosis, selectDiagnosis, selectDiagnosisFailed, selectDiagnosisLoading} from "../../redux/ducks/diagnosis";
import {
  fetchMe,
  selectUser,
  selectUserLoading,
  selectUserFailed
} from '../../redux/ducks/auth.js'
import {deleteDiagnosis} from "../../redux/ducks/diagnosis";

import Moment from 'moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {  Paper,  Typography,Divider,Tooltip,Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrashAlt,faPlusCircle,faCheckCircle,faExclamationCircle,faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import Graph from './Graph.js'
// const history = useHistory();


class ViewDiagnosisDoc extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
     // id: this.props.match.params.id,
      //username: null,
  
      result : this.props.match.params.id
 
      
    };
  }
   
  componentDidMount(){
   
   this.props.fetchDiagnosis(this.state)
    //this.props.fetchMe(this.state)
   
  }

 
  deleteData = () =>{

    this.props.deleteDiagnosis(this.props.diagnosis)
    this.props.history.push("/Login");
   // window.location.reload();

  
  }


  goPage = (page) => {
    this.props.history.push(page);
  }
 
  render=()=>{
    
   
    // this.setState({role: this.props.user.role})
    
    //  localStorage.setItem('role', this.props.user.role);
    // console.log(role)
    console.log(this.props.fetchMe.role)
    
    if(this.props.diagnosisLoading){
      return(
           <loader/>
      )
      }
      else if(this.props.diagnosisFailed ){
        
        // let isDoctor = true
        // let isDoctor = role== "ROLE_DOCTOR";
         let isDoctor = localStorage.getItem("role")=="ROLE_DOCTOR";
        console.log(isDoctor)
        return(
        
          
          <div className="wrapper">
                <h1 style={{textAlign: "center"}}>Diagnosis</h1>
              
                <form >
                <Paper style={{ padding:50, justifyContent: "center",margin:"auto",width:750}}>
                  
                      <label>
                          <div><Typography style={{fontSize: 20,fontWeight: 600}} >CreatedBy :  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}} >not available </Typography></div>
                          <Divider />
                      </label>
                      <label>
                          
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}>CreatedDate :  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}}>not available </Typography></div>
                          <Divider />
                      </label>
                      <label>
                         
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}>Category :  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}}>not available </Typography></div>
                          <Divider />
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}>Comments :  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}}>not available </Typography></div>
                          <Divider />
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}>Last modified by: </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}}>not available </Typography></div>
                          <Divider />
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}>Last modified date: </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}}>not available </Typography></div>
                          <Divider />
                      </label>
                      <label>
                        <div style={{marginTop: 30,marginLeft:350}}>
                      {isDoctor ?                                                                                                                                                      
                          <FontAwesomeIcon icon={faPlusCircle} style={{color: "#115293"}}size = '3x' variant="contained" color="primary" onClick={() => this.goPage( `/SubmitDiagnosis/${this.state.result} `)}/>
                      : null}
                        </div>
                      </label>
                  </Paper>
                </form>
               
              </div>
                
        )
      }
    
   
    else{
     // let isDiagnosisExist =  this.props.diagnosis.id;
    //  let isDoctor = true
    // let isDoctor = role== "ROLE_DOCTOR";
 //   let isDoctor = role== "ROLE_DOCTOR";
    //  let isDoctor = localStorage.getItem("role")=="ROLE_DOCTOR";
    // console.log(role)
    let isDoctor = localStorage.getItem("role")=="ROLE_DOCTOR";
    const cat = this.props.diagnosis.label;
    let isLow = cat == "Low";
    let isHigh = cat == "High";
    let isModerate = cat == "Moderate";
     return (
       
         //    let match = useRouteMatch();
        <Router>
          
          <div className="wrapper">
                <h1 style={{textAlign: "center"}}>Diagnosis</h1>
              
                <form >
                <Paper style={{ padding:50, justifyContent: "center",margin:"auto",width:750}}>
                  <label>
                    <Graph></Graph>
                  </label>
                      <label>
                          <div><Typography  style={{fontSize: 20,fontWeight: 600}} >CreatedBy :  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}} > {this.props.diagnosis.createdBy}</Typography></div>
                          <Divider />
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}  >CreatedDate :  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}} >{Moment(this.props.diagnosis.createdDate).format('DD-MM-YYYY')} </Typography></div>
                          <Divider />
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}  >Category :   </Typography></div>
                          <div>
                            <Typography style={{marginTop: 10,fontSize:18}} >
                              {this.props.diagnosis.label}
                              {isLow ? 
                              <Tooltip title={<h4 style={{fontSize:13}}>You have poor cognitive flexibility and working memory.Please practice more!</h4>}>
                                <Button style={{ backgroundColor: 'transparent' }}>
                                  <FontAwesomeIcon icon={faExclamationCircle} style={{color: "#CC0000",marginLeft:50}}  size = '2x' variant="contained" color="primary"/>
                                </Button>
                              </Tooltip>
                              : null}
                              {isHigh ? 
                              <Tooltip title={<h4 style={{fontSize:13}}>Excellent! You have good cognitive flexibility and working memory.</h4>}>
                                <Button style={{ backgroundColor: 'transparent' }}>
                                  <FontAwesomeIcon icon={faThumbsUp} style={{color: "#FF9999",marginLeft:50}}  size = '2x' variant="contained" color="primary"/>
                                </Button>
                              </Tooltip>
                              : null}
                              {isModerate ? 
                              <Tooltip title={<h4 style={{fontSize:13}}>You have normal cognitive flexibility and working memory.</h4>}>
                                <Button style={{ backgroundColor: 'transparent' }}>
                                   <FontAwesomeIcon icon={faCheckCircle} style={{color: "#009900",marginLeft:50}}  size = '2x' variant="contained" color="primary"/>
                                </Button>
                              </Tooltip>
                              : null}
                            </Typography>
                          </div>
                          <Divider />
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}  >Comments :  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}} >{this.props.diagnosis.description}  </Typography></div>
                          <Divider />
                         
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}  >last modified by:  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}} >{this.props.diagnosis.lastModifiedBy}</Typography></div>
                          <Divider />
                      
                      </label>
                      <label>
                          <div style={{marginTop: 25}}><Typography  style={{fontSize: 20,fontWeight: 600}}  >last modified date:  </Typography></div>
                          <div><Typography style={{marginTop: 10,fontSize:18}} >{Moment(this.props.diagnosis.lastModifiedDate).format('DD-MM-YYYY')}</Typography></div>
                          <Divider />
                       
                      </label>
                      <label>
                      {isDoctor ? 
                          <div style={{marginTop: 30,marginLeft:300}}>                                                                                                                                    
                              <div><FontAwesomeIcon icon={faEdit} style={{color: "#115293"}}  size = '2x' variant="contained" color="primary" onClick={() => this.goPage(`/editDiagnosis/${this.state.result}`)}/>
                                  <FontAwesomeIcon icon={faTrashAlt} style={{ marginLeft: 100,color: "#115293" }}size = '2x' variant="contained" color="primary" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?'))this.deleteData()}}/> 
                              </div>
                          </div>
                          : null}
                      </label>
                  </Paper>
                </form>
              </div>
             
                    
        </Router>
   )}
  }
}


ViewDiagnosisDoc.propTypes = {
 
  fetchDiagnosis: PropTypes.func.isRequired,
  deleteDiagnosis: PropTypes.func.isRequired,
  diagnosisLoading:PropTypes.bool.isRequired,
  diagnosisFailed:PropTypes.bool,
  diagnosis:PropTypes.object.isRequired,
  fetchMe: PropTypes.func.isRequired,
    userLoading: PropTypes.bool.isRequired,
    userFailed: PropTypes.bool,
    user: PropTypes.array.isRequired,
 

};


const mapStateToProps = (state) =>({
    diagnosisLoading:selectDiagnosisLoading(state),
    diagnosisFailed:selectDiagnosisFailed(state),
    diagnosis:selectDiagnosis(state),
    userLoading: selectUserLoading(state),
    userFailed: selectUserFailed(state),
    user: selectUser(state),


});

const dispatchers = {
  fetchDiagnosis,
  deleteDiagnosis,
  fetchMe

};

export default connect(mapStateToProps, dispatchers)(ViewDiagnosisDoc);
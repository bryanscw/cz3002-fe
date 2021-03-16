import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Diagnosis.css";
import {fetchDiagnosis} from "../redux/ducks/diagnosis";
import {deleteDiagnosis} from "../redux/ducks/diagnosis";
import { withRouter } from "react-router-dom";
import Moment from 'moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button , Paper, Form, Typography } from "@material-ui/core";
// const history = useHistory();
class ViewDiagnosisDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: this.props.match.params.id,
      //username: null,
     id :null,
      createdBy : null,
      createdDate : null,
      lastModifiedBy : null,
      lastModifiedDate : null,
      doctor : null,
      label : null,
      description : null
      
    };
  
    
    
  }
  
  componentDidMount(){
    this.props.fetchDiagnosis(this.state).then(resp =>{
      if(resp){
        let data = resp.data;
        this.setState({
          
          id:data.id,
          createdBy: data['createdBy'],
        createdDate: Moment(data['createdDate']).format('DD-MM-YYYY'),
        lastModifiedBy: data['lastModifiedBy'],
        lastModifiedDate: Moment(data['lastModifiedDate']).format('DD-MM-YYYY'),
        doctor: data['doctor'],
        label: data['label'],
        description: data['description'], 

      });
      this.forceUpdate();
     
      }else {
       // this.forceUpdate();
       
        this.setState({
          id:null,
          createdBy: "not available " ,
        createdDate: "not available ",
        lastModifiedBy: "not available ",
        lastModifiedDate: "not available ",
        doctor: "not available ",
        label: "not available ",
        description: "not available ", 
      });
      this.forceUpdate();
      }
     // this.forceUpdate();
      
    }) 
  }

 
  deleteData = () =>{

  //  window.location.reload(false);
    
    this.props.deleteDiagnosis(this.state)
    this.setState({id :null});
   // this.forceUpdate();
    //this.props.history.push("/viewDiagnosis");
    window.location.reload();
  // window.location.reload(false);
  
  }
  goPage = (page) => {
    this.props.history.push(page);
  }

  getDate = (date) => {
    return date.split(' ')[0]
   }

 
  render() {

     console.log(this.state);
  //   const role = getUser().role
  //const role = fetchMe().role
   //  let role= getUser.role;
   //console.log(role);
  // let isDoctor = role== "ROLE_DOCTOR";
    let isDoctor = true;
  
    let isDiagnosisExist =  this.state.id;
     return (
         //    let match = useRouteMatch();
        <Router>
          <div className="wrapper">
                <h1>Diagnosis</h1>
              
                <form >
                <Paper style={{ padding: 16 }}>
                  
                      <label>
                          <p>CreatedBy :  {this.state.createdBy}</p>
                        
                      </label>
                      <label>
                          <p>CreatedDate :{this.state.createdDate}</p>
                        
                      </label>
                      <label>
                          <p>Category :   {this.state.label}  </p>
                      </label>
                      <label>
                          <p>Comments :   {this.state.description} </p>
                         
                      </label>
                      <label>
                          <p>last modified by:{this.state.lastModifiedBy} </p>
                      
                      </label>
                      <label>
                          <p>last modified date:{this.state.lastModifiedDate}</p>
                       
                      </label>
                 
                  </Paper>
                </form>
              </div>
                  <div>
            <ul>
            {isDoctor ? 
            <div>
             {!isDiagnosisExist ?
                 <Button variant="contained" color="primary" onClick={() => this.goPage("/SubmitDiagnosis")}>Submit New Diagnosis</Button>
                :null}
            
                 {isDiagnosisExist ?
                   <div><Button variant="contained" color="primary" onClick={() => this.goPage(`/editDiagnosis/1`)}>edit Diagnosis</Button>
                   <Button variant="contained" color="primary" onClick={() => this.deleteData()}> Delete</Button></div>
                   :null}
             </div>
            : null}
            
            </ul>
            {/* <Switch>
                {!isDiagnosisExist ?
                <button onClick={() => this.goPage("/SubmitDiagnosis")}>Submit NEW Diagnosis</button>
              :null}
            </Switch> */}
        </div>
                    
        </Router>
   )}
}


ViewDiagnosisDoc.propTypes = {
  /** An action creator for authenticating login */
  fetchDiagnosis: PropTypes.func.isRequired,
  deleteDiagnosis: PropTypes.func.isRequired
};




const dispatchers = {
  fetchDiagnosis,
  deleteDiagnosis
};

export default withRouter(connect(() => ({}), dispatchers)(ViewDiagnosisDoc));
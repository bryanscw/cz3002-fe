import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import "./Diagnosis.css";
import {fetchDiagnosis} from "../redux/ducks/diagnosis";
import {deleteDiagnosis} from "../redux/ducks/diagnosis";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
// const history = useHistory();
class ViewDiagnosisDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: this.props.match.params.id,
      //username: null,
    
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
    this.props.fetchDiagnosis(this.state).then(data =>{
      if(data){
        this.setState({
          id:data.id,
          createdBy: data['createdBy'],
        createdDate: data['createdDate'],
        lastModifiedBy: data['lastModifiedBy'],
        lastModifiedDate: data['lastModifiedDate'],
        doctor: data['doctor'],
        label: data['label'],
        description: data['description'], 
      });
      }else {
        this.setState({id:2,
          createdBy: 0,
        createdDate: 0,
        lastModifiedBy: 0,
        lastModifiedDate: 0,
        doctor: 0,
        label: 0,
        description: 0, 
      });
      this.forceUpdate();
      }
     
    }) //disable button for edit if user logs in ,disable submit if there exits data , if no data display no data found (edit form).
  }

  deleteData = () =>{

    this.props.deleteDiagnosis(this.state)
    this.props.history.push("/ViewDiagnosisDoc");

  }
  goPage = (page) => {
    this.props.history.push(page);
  }

 
  render() {

     console.log(this.state);
    //  let isDoctor = localStorage.getItem("role") == "doctor";
    let isDoctor = true;
     return (
         //    let match = useRouteMatch();
        <Router>
          <div className="wrapper">
                <h1>Diagnosis</h1>
              
                <form>
                  <fieldset>
                      <label>
                          <p>CreatedBy:</p>
                          <div>{this.state.createdBy}</div>
                      </label>
                      <label>
                          <p>Date:</p>
                          <div >{this.state.createdDate}</div>
                      </label>
                      <label>
                          <p>Category : </p>
                          <div value={this.state['label']} ></div>
                      </label>
                      <label>
                          <p>Comments :</p>
                          <div value={this.state['description']} ></div>
                      </label>
                      <label>
                          <p>last modified by:</p>
                          <div value={this.state['lastModifiedBy']} ></div>
                      </label>
                      <label>
                          <p>last modified date:</p>
                          <div value={this.state['lastModifiedDate']} ></div>
                      </label>
                  </fieldset>
                </form>
              </div>
                  <div>
            <ul>
            {isDoctor ? 
            <div>
             <button onClick={() => this.goPage("/SubmitDiagnosis")}>Submit NEW Diagnosis</button>
             <button onClick={() => this.goPage(`/editDiagnosis/${this.state.id}`)}>edit Diagnosis</button>
             <button onClick={() => this.deleteData()}> Delete</button>
             </div>
            : null}
            
            </ul>
            {/* <Switch>
               
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
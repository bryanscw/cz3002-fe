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
import {fetchDiagnosis, selectDiagnosis, selectDiagnosisFailed, selectDiagnosisLoading} from "../redux/ducks/diagnosis";
import {deleteDiagnosis} from "../redux/ducks/diagnosis";
import { withRouter } from "react-router-dom";
import Moment from 'moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button , Paper, Form, Typography } from "@material-ui/core";
// const history = useHistory();
class ViewDiagnosisDoc extends Component {
 
  
  componentDidMount(){
   this.props.fetchDiagnosis(this.state)
   
  }

 
  deleteData = () =>{

    this.props.deleteDiagnosis(this.props.diagnosis)
   // this.forceUpdate();
    //this.props.history.push("/viewDiagnosis");
   // window.location.reload();
   window.location.reload(false);
  
  }


  goPage = (page) => {
    this.props.history.push(page);
  }
 
  render=()=>{

  //   const role = getUser().role
  //const role = fetchMe().role
   //  let role= getUser.role;
   //console.log(role);
  // let isDoctor = role== "ROLE_DOCTOR";

   // this.state=this.props.diagnosis;
   
    if(this.props.diagnosisLoading){
      return(
           <loader/>
      )
      }
      else if(this.props.diagnosisFailed){
        let isDoctor = true;
        return(
        
          
          <div className="wrapper">
                <h1>Diagnosis</h1>
              
                <form >
                <Paper style={{ padding: 16 }}>
                  
                      <label>
                          <p>CreatedBy : not available </p>
                        
                      </label>
                      <label>
                          <p>CreatedDate :not available </p>
                        
                      </label>
                      <label>
                          <p>Category :  not available   </p>
                      </label>
                      <label>
                          <p>Comments :  not available  </p>
                         
                      </label>
                      <label>
                          <p>last modified by:not available  </p>
                      
                      </label>
                      <label>
                          <p>last modified date:not available </p>
                       
                      </label>
                 
                  </Paper>
                </form>
                <ul>
                {isDoctor ? 
                <Button variant="contained" color="primary" onClick={() => this.goPage("/SubmitDiagnosis")}>Submit New Diagnosis</Button>
                : null}
                </ul>
              </div>
                
        )
      }
    
   
    else{
     // let isDiagnosisExist =  this.props.diagnosis.id;
    //  let isDiagnosisExist =  true;
      let isDoctor = true;
      console.log(this.props.diagnosis)
     return (
       
         //    let match = useRouteMatch();
        <Router>
          
          <div className="wrapper">
                <h1>Diagnosis</h1>
              
                <form >
                <Paper style={{ padding: 16 }}>
                  
                      <label>
                          <p>CreatedBy :  {this.props.diagnosis.createdBy}</p>
                        
                      </label>
                      <label>
                          <p>CreatedDate :{Moment(this.props.diagnosis.createdDate).format('DD-MM-YYYY')}</p>
                        
                      </label>
                      <label>
                          <p>Category :   {this.props.diagnosis.label}  </p>
                      </label>
                      <label>
                          <p>Comments :   {this.props.diagnosis.description} </p>
                         
                      </label>
                      <label>
                          <p>last modified by:{this.props.diagnosis.lastModifiedBy} </p>
                      
                      </label>
                      <label>
                          <p>last modified date:{Moment(this.props.diagnosis.lastModifiedDate).format('DD-MM-YYYY')}</p>
                       
                      </label>
                 
                  </Paper>
                </form>
              </div>
                  <div>
            <ul>
            {isDoctor ? 
            <div>
                <div><Button variant="contained" color="primary" onClick={() => this.goPage(`/editDiagnosis/1`)}>edit Diagnosis</Button>
                     <Button variant="contained" color="primary" onClick={() => this.deleteData()}> Delete</Button>
                </div>
                 
            </div>
            : null}
            
            </ul>
         
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

};


const mapStateToProps = (state) =>({
    diagnosisLoading:selectDiagnosisLoading(state),
    diagnosisFailed:selectDiagnosisFailed(state),
    diagnosis:selectDiagnosis(state),

});

const dispatchers = {
  fetchDiagnosis,
  deleteDiagnosis
};

export default withRouter(connect(mapStateToProps, dispatchers)(ViewDiagnosisDoc));
//export default connect(mapStateToProps, dispatchers)(ViewDiagnosisDoc);

//export default withRouter(connect(() => ({}), dispatchers)(ViewDiagnosisDoc));

 // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // id: this.props.match.params.id,
  //     //username: null,
  //    id :null,
  //     createdBy : null,
  //     createdDate : null,
  //     lastModifiedBy : null,
  //     lastModifiedDate : null,
  //     doctor : null,
  //     label : null,
  //     description : null
      
  //   };
  
    
    
  // }

// this.props.fetchDiagnosis(this.state).then(resp =>{
//   if(resp){
//     //console.log(resp)
//     let data = resp.data;
//     this.setState({
      
//       id:data.id,
//       createdBy: data['createdBy'],
//       createdDate: Moment(data['createdDate']).format('DD-MM-YYYY'),
//       lastModifiedBy: data['lastModifiedBy'],
//       lastModifiedDate: Moment(data['lastModifiedDate']).format('DD-MM-YYYY'),
//       doctor: data['doctor'],
//       label: data['label'],
//       description: data['description'], 

//   });
//   this.forceUpdate();
 
//   }else {
//    // this.forceUpdate();
   
//     this.setState({
//       id:null,
//       createdBy: "not available " ,
//       createdDate: "not available ",
//       lastModifiedBy: "not available ",
//       lastModifiedDate: "not available ",
//       doctor: "not available ",
//       label: "not available ",
//       description: "not available ", 
//   });
//   this.forceUpdate();
//   }
//  // this.forceUpdate();
  
// }) 

// {!isDiagnosisExist ?
//   <Button variant="contained" color="primary" onClick={() => this.goPage("/SubmitDiagnosis")}>Submit New Diagnosis</Button>
//  :null}

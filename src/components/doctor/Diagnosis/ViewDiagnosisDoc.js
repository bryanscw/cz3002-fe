// import {BrowserRouter as Router, Redirect} from "react-router-dom";
// import React, {Component} from "react";
//
// import "./Diagnosis.css";
// import {
//   deleteDiagnosis,
//   fetchDiagnosis,
//   selectDiagnosis,
//   selectDiagnosisFailed,
//   selectDiagnosisLoading
// } from "../../../redux/ducks/diagnosis";
// import {
//   fetchMe,
//   selectUser,
//   selectUserFailed,
//   selectUserLoading
// } from '../../../redux/ducks/auth.js'
//
// import Moment from 'moment';
// import PropTypes from "prop-types";
// import {connect} from "react-redux";
// import {Button, Divider, Paper, Tooltip, Typography} from "@material-ui/core";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {
//   faCheckCircle,
//   faEdit,
//   faExclamationCircle,
//   faThumbsUp,
//   faTrashAlt
// } from '@fortawesome/free-solid-svg-icons';
// import Graph from './Graph.js'
//
// class ViewDiagnosisDoc extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       result: this.props.match.params.id
//     };
//   }
//
//   componentDidMount() {
//
//     this.props.fetchDiagnosis(this.state)
//   }
//
//   deleteData = () => {
//     this.props.deleteDiagnosis(this.props.diagnosis)
//   }
//
//   goPage = (page) => {
//     this.props.history.push(page);
//   }
//
//   render = () => {
//     const {
//       diagnosisLoading,
//       diagnosisFailed,
//       diagnosis,
//       userLoading,
//       userFailed,
//       user
//     } = this.props;
//
//     if (diagnosisLoading) {
//       return (
//           <loader/>
//       )
//     } else if (diagnosisFailed || !diagnosis) {
//       return <Redirect to="/not-found"/>;
//     } else {
//       const cat = diagnosis.label;
//
//       let isLow = cat == "Low";
//       let isHigh = cat == "High";
//       let isModerate = cat == "Moderate";
//       return (
//
//           //    let match = useRouteMatch();
//           <Router>
//
//             <div className="wrapper">
//               <h1 style={{textAlign: "center"}}>Diagnosis</h1>
//
//               <form>
//                 <Paper style={{
//                   padding: 50,
//                   justifyContent: "center",
//                   margin: "auto",
//                   width: 750
//                 }}>
//                   <label>
//                     <Graph></Graph>
//                   </label>
//                   <label>
//                     <div><Typography style={{fontSize: 20, fontWeight: 600}}>CreatedBy
//                       : </Typography></div>
//                     <div><Typography style={{
//                       marginTop: 10,
//                       fontSize: 18
//                     }}> {this.props.diagnosis.createdBy}</Typography></div>
//                     <Divider/>
//                   </label>
//                   <label>
//                     <div style={{marginTop: 25}}><Typography
//                         style={{fontSize: 20, fontWeight: 600}}>CreatedDate
//                       : </Typography></div>
//                     <div><Typography
//                         style={{marginTop: 10, fontSize: 18}}>{Moment(
//                         this.props.diagnosis.createdDate).format(
//                         'DD-MM-YYYY')} </Typography></div>
//                     <Divider/>
//                   </label>
//                   <label>
//                     <div style={{marginTop: 25}}><Typography
//                         style={{fontSize: 20, fontWeight: 600}}>Category
//                       : </Typography></div>
//                     <div>
//                       <Typography style={{marginTop: 10, fontSize: 18}}>
//                         {this.props.diagnosis.label}
//                         {isLow ?
//                             <Tooltip
//                                 title={<h4 style={{fontSize: 13}}>You have poor
//                                   cognitive flexibility and working
//                                   memory.Please practice more!</h4>}>
//                               <Button style={{backgroundColor: 'transparent'}}>
//                                 <FontAwesomeIcon icon={faExclamationCircle}
//                                                  style={{
//                                                    color: "#CC0000",
//                                                    marginLeft: 50
//                                                  }} size='2x'
//                                                  variant="contained"
//                                                  color="primary"/>
//                               </Button>
//                             </Tooltip>
//                             : null}
//                         {isHigh ?
//                             <Tooltip
//                                 title={<h4 style={{fontSize: 13}}>Excellent! You
//                                   have good cognitive flexibility and working
//                                   memory.</h4>}>
//                               <Button style={{backgroundColor: 'transparent'}}>
//                                 <FontAwesomeIcon icon={faThumbsUp} style={{
//                                   color: "#FF9999",
//                                   marginLeft: 50
//                                 }} size='2x' variant="contained"
//                                                  color="primary"/>
//                               </Button>
//                             </Tooltip>
//                             : null}
//                         {isModerate ?
//                             <Tooltip title={<h4 style={{fontSize: 13}}>You have
//                               normal cognitive flexibility and working
//                               memory.</h4>}>
//                               <Button style={{backgroundColor: 'transparent'}}>
//                                 <FontAwesomeIcon icon={faCheckCircle} style={{
//                                   color: "#009900",
//                                   marginLeft: 50
//                                 }} size='2x' variant="contained"
//                                                  color="primary"/>
//                               </Button>
//                             </Tooltip>
//                             : null}
//                       </Typography>
//                     </div>
//                     <Divider/>
//                   </label>
//                   <label>
//                     <div style={{marginTop: 25}}><Typography
//                         style={{fontSize: 20, fontWeight: 600}}>Comments
//                       : </Typography></div>
//                     <div><Typography style={{
//                       marginTop: 10,
//                       fontSize: 18
//                     }}>{this.props.diagnosis.description}  </Typography></div>
//                     <Divider/>
//
//                   </label>
//                   <label>
//                     <div style={{marginTop: 25}}><Typography
//                         style={{fontSize: 20, fontWeight: 600}}>last modified
//                       by: </Typography></div>
//                     <div><Typography style={{
//                       marginTop: 10,
//                       fontSize: 18
//                     }}>{this.props.diagnosis.lastModifiedBy}</Typography></div>
//                     <Divider/>
//
//                   </label>
//                   <label>
//                     <div style={{marginTop: 25}}><Typography
//                         style={{fontSize: 20, fontWeight: 600}}>last modified
//                       date: </Typography></div>
//                     <div><Typography
//                         style={{marginTop: 10, fontSize: 18}}>{Moment(
//                         this.props.diagnosis.lastModifiedDate).format(
//                         'DD-MM-YYYY')}</Typography></div>
//                     <Divider/>
//
//                   </label>
//                   <label>
//                     <div style={{marginTop: 30, marginLeft: 300}}>
//                       <div><FontAwesomeIcon icon={faEdit}
//                                             style={{color: "#115293"}}
//                                             size='2x' variant="contained"
//                                             color="primary"
//                                             onClick={() => this.goPage(
//                                                 `/editDiagnosis/${this.state.result}`)}/>
//                         <FontAwesomeIcon icon={faTrashAlt} style={{
//                           marginLeft: 100,
//                           color: "#115293"
//                         }} size='2x' variant="contained" color="primary"
//                                          onClick={() => {
//                                            if (window.confirm(
//                                                'Are you sure you wish to delete this item?')) {
//                                              this.deleteData()
//                                            }
//                                          }}/>
//                       </div>
//                     </div>
//                   </label>
//                 </Paper>
//               </form>
//             </div>
//
//
//           </Router>
//       )
//     }
//   }
// }
//
// ViewDiagnosisDoc.propTypes = {
//
//   fetchDiagnosis: PropTypes.func.isRequired,
//   deleteDiagnosis: PropTypes.func.isRequired,
//   diagnosisLoading: PropTypes.bool.isRequired,
//   diagnosisFailed: PropTypes.bool,
//   diagnosis: PropTypes.object.isRequired,
//   fetchMe: PropTypes.func.isRequired,
//   userLoading: PropTypes.bool.isRequired,
//   userFailed: PropTypes.bool,
//   user: PropTypes.array.isRequired,
//
// };
//
// const mapStateToProps = (state) => ({
//   diagnosisLoading: selectDiagnosisLoading(state),
//   diagnosisFailed: selectDiagnosisFailed(state),
//   diagnosis: selectDiagnosis(state),
//   userLoading: selectUserLoading(state),
//   userFailed: selectUserFailed(state),
//   user: selectUser(state),
//
// });
//
// const dispatchers = {
//   fetchDiagnosis,
//   deleteDiagnosis,
//   fetchMe
//
// };
//
// export default connect(mapStateToProps, dispatchers)(ViewDiagnosisDoc);
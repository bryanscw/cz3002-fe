// import React, {Component} from "react";
// import PropTypes from "prop-types";
// import {connect} from "react-redux";
// import {createDiagnosis} from "../../../redux/ducks/diagnosis";
// import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
// import {Button, Paper, Select, TextField, Typography} from "@material-ui/core";
// //import { Link } from "react-router-dom";
// //import {createDiagnosis} from "../redux/ducks/diagnosis";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
//
// import "./Diagnosis.css";
//
// class SubmitDiagnosis extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       // id: this.props.match.params.id,
//       //username: null,
//       id: null,
//       createdBy: null,
//       createdDate: null,
//       lastModifiedBy: null,
//       lastModifiedDate: null,
//       result: this.props.match.params.result,
//       doctor: null,
//       label: null,
//       description: null
//
//     };
//     console.log(this.state)
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   validateForm() {
//     if (
//         this.state.label == null ||
//         this.state.description == null
//
//     ) {
//       return false;
//     }//initialisation
//     else {
//       return (
//           this.state.label.length > 0 &&
//           this.state.description.length > 0
//
//       );
//     }
//   }
//
//   handleInputChange(event) {
//     this.setState({
//       ...this.state,
//       ...{
//         [event.target.name]: event.target.value,
//       },
//     });
//   }
//
//   handleSubmit() {
//     // console.log("form was submitted");
//     // event.preventDefault();
//     // let doctor = localStorage.getItem("doctor");
//     // this.setState({
//     //   doctor:doctor,
//     //   createdDate:new Date(),
//     //   createdBy:doctor
//     // })
//     // console.log(this.state);
//     // const resultId = this.props.match.params.result
//     //window.location.reload(false);
//     this.props.createDiagnosis(this.state);
//     this.props.history.push(`/viewDiagnosis/${this.state.result} `);
//     window.location.reload();
//     //
//
//   }
//
//   render() {
//     return (
//         <div className="wrapper">
//           <h1 style={{textAlign: "center"}}>Diagnosis</h1>
//
//           <form onSubmit={this.handleSubmit}>
//             <Paper style={{
//               padding: 50,
//               justifyContent: "center",
//               margin: "auto",
//               width: 500
//             }}>
//               <label>
//                 <div><Typography style={{fontSize: 17}}>Category : </Typography>
//                 </div>
//                 <Select name="label" onChange={this.handleInputChange}>
//                   <option value="">--Please choose an option--</option>
//                   <option value="Moderate">Moderate</option>
//                   <option value="High">High</option>
//                   <option value="Low">Low</option>
//                 </Select>
//               </label>
//               <label>
//                 <div style={{marginTop: 20}}>
//
//                   <TextField
//                       id="outlined-multiline-static"
//                       name="description"
//                       label="comments"
//                       style={{width: 500}}
//
//                       multiline
//                       rows={10}
//
//
//                       variant="filled"
//                       onChange={this.handleInputChange}
//                   />
//                 </div>
//               </label>
//               <label>
//                 <div style={{marginTop: 30, marginLeft: 220}}>
//                   <Button style={{backgroundColor: 'transparent'}} type="submit"
//                           disabled={!this.validateForm()}>
//                     <FontAwesomeIcon icon={faPlusCircle}
//                                      style={{color: "#115293"}} size="3x"/>
//                   </Button>
//
//                 </div>
//               </label>
//             </Paper>
//
//           </form>
//         </div>
//     );
//   }
// }
//
// SubmitDiagnosis.propTypes = {
//   diagnosisFailed: PropTypes.func,
// };
//
// const dispatchers = {
//   createDiagnosis
// };
//
// export default connect(() => ({}), dispatchers)(SubmitDiagnosis);
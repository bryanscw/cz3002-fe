import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDiagnosis } from "../redux/ducks/diagnosis";
import { Button, Select, Paper, Container } from "@material-ui/core";
//import { Link } from "react-router-dom";
//import {createDiagnosis} from "../redux/ducks/diagnosis";
import "./Diagnosis.css";
class editDiagnosis extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.state = {
      id: this.props.match.params.id,
      //username: null,
     // id : 1,
      //id:null,
      createdBy : null,
      createdDate : null,
      lastModifiedBy : null,
      lastModifiedDate : null,
      result : null,
      doctor : null,
      label : null,
      description : null
      
    };
  }

  validateForm() {
    if (
      this.state.label == null ||
      this.state.description == null 

    )
      return false;
    else
      return (
        this.state.label.length > 0 &&
        this.state.description.length > 0 
    
      );
  }

  updateData = () => {
    
    let doctor = localStorage.getItem("doctor");
    console.log(this.state);

    this.props.updateDiagnosis(this.state);
    this.props.history.push("/viewDiagnosis");
      
  }

  handleInputChange = input => e => {
    this.setState({[input]: e.target.value})
  }

  render(){
    return(
    <div className="wrapper">
      <h1>Diagnosis</h1>
     
        <Paper style={{ padding: 16 }}> 
           

            <label>
                <p>Category : </p>
                <Select name="label"  onChange={this.handleInputChange("label")}>
                    <option value="">--Please choose an option--</option>
                    <option value="moderate">moderate</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                </Select>
            </label>
            <label>
                <p>Comments :</p>
                <textarea name="description"  onChange={this.handleInputChange("description")} />
            </label>
        </Paper>
        <p>
          <Button variant="contained" color="primary" disabled={!this.validateForm()} onClick={() => this.updateData()}>Submit</Button>
        </p>
    </div>
  );
}
}
editDiagnosis.propTypes = {
  /** An action creator for authenticating login */
  updateDiagnosis: PropTypes.func.isRequired
};

const dispatchers = {
  updateDiagnosis
};

export default connect(() => ({}), dispatchers)(editDiagnosis);
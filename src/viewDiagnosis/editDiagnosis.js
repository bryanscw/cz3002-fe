import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDiagnosis } from "../redux/ducks/diagnosis";
import { Button, CssBaseline, TextField, Container } from "@material-ui/core";
//import { Link } from "react-router-dom";
//import {createDiagnosis} from "../redux/ducks/diagnosis";
import "./Diagnosis.css";
class editDiagnosis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      //username: null,
      // id : 1,
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
    /*delete this.state.user
    var itemdetails = this.state
    var updates = {}
    updates['/items/'] = itemdetails
    //  updated
    this.setState({snackbar: true})

    return users.database().ref().update(updates)*/
    let doctor = localStorage.getItem("doctor");
    console.log(this.state);

    this.props.updateDiagnosis(this.state);
      
  }

  handleInputChange = input => e => {
    this.setState({[input]: e.target.value})
  }

  render(){
    return(
    <div className="wrapper">
      <h1>Diagnosis</h1>
     
        <fieldset>
           

            <label>
                <p>Category : </p>
                <select name="label"  onChange={this.handleInputChange("label")}>
                    <option value="">--Please choose an option--</option>
                    <option value="moderate">moderate</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <label>
                <p>Comments :</p>
                <textarea name="description"  onChange={this.handleInputChange("description")} />
            </label>
        </fieldset>
       <button disabled={!this.validateForm()} onClick={() => this.updateData()}>Submit</button>
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
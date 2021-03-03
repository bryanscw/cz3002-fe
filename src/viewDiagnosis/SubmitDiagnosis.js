
import './Diagnosis.css';
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//import { Link } from "react-router-dom";
//import "./SystemAdmin.css";

import diagnosis from "../redux/ducks/diagnosis";

class SubmitDiagnosis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: this.props.match.params.id,
      //username: null,
      id : 1,
      createdBy : null,
      createdDate : null,
      lastModifiedBy : null,
      lastModifiedDate : null,
      result : null,
      doctor : null,
      label : null,
      description : null
      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    if (
      this.state.label == null ||
      this.state.description == null 

    )
      return false;
    //initialisation
    else
      return (
        this.state.label.length > 0 &&
        this.state.description.length > 0 
    
      );
  }

  handleInputChange(event) {
    this.setState({
      ...this.state,
      ...{
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    console.log("form was submitted");
    event.preventDefault();

    console.log(this.state);

    diagnosis
      .createDiagnosis(this.state)
      .then(() => {
       // this.props.history.push("/login");
      })
      .catch((error) => console.log(error));
  }

  render(){
    return(
    <div className="wrapper">
      <h1>Diagnosis</h1>
     
      <form onSubmit={this.handleSubmit}>
        <fieldset>
           

            <label>
                <p>Category : </p>
                <select name="label"  onChange={this.handleInputChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="moderate">moderate</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <label>
                <p>Comments :</p>
                <textarea name="description"  onChange={this.handleInputChange} />
            </label>
        </fieldset>
       <button type="submit"  disabled={!this.validateForm()}>Submit</button>
      </form>
    </div>
  );
}
}

export default SubmitDiagnosis;
//https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react#prerequisites
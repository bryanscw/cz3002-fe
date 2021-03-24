import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateDiagnosis} from "../../../redux/ducks/diagnosis";
import {Button, Paper, Select, TextField, Typography} from "@material-ui/core";
//import { Link } from "react-router-dom";
//import {createDiagnosis} from "../redux/ducks/diagnosis";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import "./Diagnosis.css";

class editDiagnosis extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'
            + today.getDate();

    this.state = {
      id: null,
      //username: null,
      // id : 1,
      //id:null,
      createdBy: null,
      createdDate: null,
      lastModifiedBy: null,
      lastModifiedDate: null,
      result: this.props.match.params.result,
      doctor: null,
      label: null,
      description: null

    };
  }

  validateForm() {
    if (
        this.state.label == null ||
        this.state.description == null

    ) {
      return false;
    } else {
      return (
          this.state.label.length > 0 &&
          this.state.description.length > 0

      );
    }
  }

  updateData = () => {

    // let doctor = localStorage.getItem("doctor");
    // console.log(this.state);

    this.props.updateDiagnosis(this.state);
    this.props.history.push(`/viewDiagnosis/${this.state.result} `);

  }

  handleInputChange = input => e => {
    this.setState({[input]: e.target.value})
  }

  render() {
    return (
        <div className="wrapper">
          <h1 style={{textAlign: "center"}}>Diagnosis</h1>

          <Paper style={{
            padding: 50,
            justifyContent: "center",
            margin: "auto",
            width: 500
          }}>


            <label>
              <div><Typography style={{fontSize: 17}}>Category : </Typography>
              </div>
              <Select name="label" onChange={this.handleInputChange("label")}>
                <option value="">--Please choose an option--</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </Select>
            </label>
            <label>
              <div style={{marginTop: 20}}>
                <TextField
                    id="outlined-multiline-static"
                    label="comments"
                    name="description"
                    style={{width: 500}}
                    multiline
                    rows={10}
                    variant="filled"
                    onChange={this.handleInputChange("description")}
                />
              </div>

            </label>
            <label>
              <div style={{marginTop: 30, marginLeft: 220}}>
                <Button style={{backgroundColor: 'transparent'}}
                        disabled={!this.validateForm()}
                        onClick={() => this.updateData()}>
                  <FontAwesomeIcon icon={faPlusCircle}
                                   style={{color: "#115293"}} size='3x'/>
                </Button>
              </div>
            </label>
          </Paper>
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
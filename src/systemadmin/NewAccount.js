import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser } from "../redux/ducks/users";
import { Button, CssBaseline, TextField, Container, Typography } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class NewAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {   
      email: null,
      pass: null,
      role: null,
      name: null,
      dob: null,
      gender: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createData = this.createData.bind(this);
  }

validateForm() {
  if (
    this.state.email == null ||
    this.state.name == null ||
    this.state.role == null ||
    this.state.dob == null ||
    this.state.gender == null ||
    this.state.pass == null
  )
    return false;
  else
    return (
      this.state.email.length > 0 &&
      this.state.pass.length > 0 &&
      this.state.name.length > 0 &&
      this.state.gender.length > 0 &&
      this.state.dob.length > 0 &&
      this.state.role.length > 0  
    );
}

createData (event){
  console.log("form was submitted");
  event.preventDefault();
  this.props.createUser(this.state);
  // this.props.history.push("/Systemadmin");
  // window.location.reload(false);
}

handleInputChange(event) {
  this.setState({
    ...this.state,
    ...{
      [event.target.name]: event.target.value,
    },
  });
}

render() {
  return (  

    <div className="main" data-test="newuserContainer">
      <Container component="main" maxWidth="xs" align="center" style={{ marginTop: 130 }} >
        <CssBaseline />
        <div className="newuser-form">
          <Typography variant="h3" style={{ marginBottom: 20 }}>Create User</Typography>
          <form onSubmit={this.createData}>
            <TextField
              data-testid="emailField"
              onChange={this.handleInputChange}         
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
              <TextField
              data-testid="passField"
              onChange={this.handleInputChange}         
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              id="pass"
              label="Password"
              name="pass"
              autoComplete="pass"            
            />
            <FormControl component="main">
              <InputLabel required htmlFor="role-native-simple">Role</InputLabel>
              <Select name="role"
               onChange={this.handleInputChange}
                native              
                style={{ width: 400, height: 50 }}
                inputProps={{
                  name: "role",
                  id: "role-native-simple"
                }}
              >
                <option style={{ fontSize: 18 }} aria-label="None" value="" />
                <option style={{ fontSize: 18 }} value="Patient">Patient</option>
                <option style={{ fontSize: 18 }} value="Doctor">Doctor</option>
              </Select>
            </FormControl>

            <TextField
              data-testid="nameField"
              onChange={this.handleInputChange}         
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
            />
            <TextField
              data-testid="dobField"
              onChange={this.handleInputChange}      
              label="Date of Birth"
              type="date"
              fullWidth
              required
              //defaultValue="yyyy-MM-dd"
              name="dob"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              data-testid="genderField"
              onChange={this.handleInputChange}           
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="gender"
              label="Gender"
              type="gender"
              id="gender"
              autoComplete="gender"
            //style={{height:25, width:200, marginLeft:55}}
            />
            <Button
              data-testid="createUserButton"
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={!this.validateForm()} 
              style={{ marginTop: 20, height: 50 }}
            >Create!</Button>

          </form>
        </div>
      </Container>
    </div>
 
  );
              }


}
NewAccount.propTypes = {
  /** An action creator for authenticating login */
  createUser: PropTypes.func.isRequired
};

const dispatchers = {
  createUser
};

export default connect(() => ({}), dispatchers)(NewAccount);
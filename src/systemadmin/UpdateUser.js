import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../redux/ducks/users";
import { Button, CssBaseline, TextField, Container, Typography } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      email: null,
      role: null,
      name: null,
      dob: null,
      gender: null,
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
    console.log(this.state);
    this.props.updateUser(this.state);

  }

  handleInputChange = input => e => {
    this.setState({ [input]: e.target.value })
  }
  render() {
    const { email, role, name, dob, gender } = this.state;

    return (
      <div className="main" data-test="updateContainer">
   <Container component="main" maxWidth="xs" align="center"  style={{  marginTop: 130 }} >
      <CssBaseline />
      <div className="update-form">
      <Typography variant="h3" style={{  marginBottom: 20 }}>Update User</Typography>
            <form
              noValidate
              onSubmit={this.updateData}
            >
              <TextField
                data-testid="emailField"
                onChange={this.handleInputChange}
                defaultValue={email}
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
              <FormControl component="main">
                <InputLabel required htmlFor="role-native-simple">Role</InputLabel>
                <Select
                  native
                  value={role}
                  onChange={this.handleInputChange}
                  style={{ width: 400, height: 50 }}
                  inputProps={{
                    name: "role",
                    id: "role-native-simple"
                  }}
                >
                  <option style={{ fontSize: 18 }} aria-label="None" value="" />
                  <option style={{ fontSize: 18 }} value={10}>Patient</option>
                  <option style={{ fontSize: 18 }} value={20}>Doctor</option>
                </Select>
              </FormControl>

              <TextField
                data-testid="nameField"
                onChange={this.handleInputChange}
                defaultValue={name}
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
                defaultValue={dob}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="dob"
                label="Date of Birth"
                type="dob"
                id="dob"
                autoComplete="dob"
              //style={{height:25, width:200, marginLeft:55}}
              />
              <TextField
                data-testid="genderField"
                onChange={this.handleInputChange}
                defaultValue={gender}
                variant="outlined"
                margin="normal"
                fullWidth
                name="gender"
                label="Gender"
                type="gender"
                id="gender"
                autoComplete="gender"
              //style={{height:25, width:200, marginLeft:55}}
              />
              <Button
                data-testid="loginButton"
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                style={{ marginTop: 20, height: 50 }}
              >Update!</Button>

            </form>
          </div>
        </Container>
      </div>
    );
  }


}
UpdateUser.propTypes = {
  /** An action creator for authenticating login */
  updateUser: PropTypes.func.isRequired
};

const dispatchers = {
  updateUser
};

export default connect(() => ({}), dispatchers)(UpdateUser);
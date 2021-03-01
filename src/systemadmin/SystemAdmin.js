import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Grid, Paper, TextField, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link as RouterLink } from "react-router-dom";
import "./SystemAdmin.css";

import users from "../redux/ducks/users";
  
class SystemAdmin extends Component {
  
    state = {['email']: 0,
            ['password']: 0,
             ['uname']: 0,
    ['dob']: 0,
    ['gender']: 0,
    ['role']: 0,
    snackbar: false
  }

  componentDidMount(){
    this.checkStatus()
  }
  getItems() {
    users.fetch("items/", {
      context: this,
      then(data) {
        this.setState({['email']: data['email'],
                      ['password']: data['password'],
                      ['uname']: data['uname'],
                      ['dob']: data['dob'],
                      ['gender']: data['gender'],
                      ['role']: data['role'], 
                    });
      }
    })
  }

  updateData = () => {
    delete this.state.user
    var itemdetails = this.state
    var updates = {}
    updates['/items/'] = itemdetails
    //  updated
    this.setState({snackbar: true})

    return users.database().ref().update(updates)
  }


  handleTextChange = input => e => {
    // itemdetails[input] = e.target.value
    this.setState({[input]: e.target.value})
  }
  handleSnackClose = (e, reason) => {
    if (reason === "clickaway"){
      return
    }
    this.setState({ snackbar: false })
  }


 
  render() {
   // console.log("username: " + this.state.username);
    console.log(this.state);
    return (
      <div className="main">
        <div className="account-form">
         <h3>Update Account</h3>
            <p> </p>

            <Grid
                className="admin-items"
                container
                direction="column"
                justify="flex-start"
                alignItems="center">

            <Paper elevation={2} className="adminItemPaper">
            <TextField 
              className="adminItemText" 
              id="email" 
              label="Email" 
              value={this.state['email']} 
              variant="outlined" 
              margin="normal"
              onChange={this.handleTextChange("email")}
            />
            <TextField 
              className="adminItemText" 
              id="password" 
              label="Password" 
              value={this.state['password']} 
              variant="outlined" 
              margin="normal"
              onChange={this.handleTextChange("password")}
            />
            <TextField 
              className="adminItemText" 
              id="dob" 
              label="DOB" 
              value={this.state['dob']} 
              variant="outlined" 
              margin="normal"
              onChange={this.handleTextChange("dob")}
            />
            <TextField 
              className="adminItemText" 
              id="uname" 
              label="Name" 
              value={this.state['uname']} 
              variant="outlined" 
              margin="normal"
              onChange={this.handleTextChange("uname")}
            />
            
            </Paper>
            <Button 
              className="adminItemUpdateconfirm_btn"
              variant="contained" color="primary" size="large" 
              onClick={() => this.updateData()}>
              Confirm!
            </Button>
            <Button
                className="adminItemUpdatehome_btn"
                variant="contained"
                color="auto"
                size="large"
                component={RouterLink}
                to="/profile"
              >
            Back
          </Button>
          
          </Grid>
          <Snackbar
                className="adminItems-snackbar"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.snackbar}
                autoHideDuration={2000}
                onClose={this.handleSnackClose}
                message="Success! Details have been updated!"
                action={
                  <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />

       
        </div>
      
           
          
        </div>
  )}
}

export default SystemAdmin;
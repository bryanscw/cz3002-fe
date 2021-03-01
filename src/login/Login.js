import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import users from "../redux/ducks/users";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
 
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await users.login(email, password);
      history.push("/App");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="main">
      <div className="login-form">  
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email   </FormLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Enter Email"
              value={email}
              style={{height:25, width:200, marginLeft:55}}
              onChange={(e) => setEmail(e.target.value)}
            /> <br/> <br/>
          </FormGroup> 
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password     </FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={password}
              style={{height:25, width:200, marginLeft:22}}
              onChange={(e) => setPassword(e.target.value)}
            /><br/> <br/>
          </FormGroup>
          <Button
            variant="contained"
            color="secondary"
            disabled={!validateForm()}
            type="submit"
            style={{marginLeft:120, marginTop:10}}
          >
            Login
          </Button>
         
        </form>
      </div>
    </div>
  );
}
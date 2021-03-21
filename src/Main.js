import Link from '@material-ui/core/Link';
import React, { Component } from 'react';
import Game from './game/Game';
import ResultController from './results/ResultController.jsx';
import { BrowserRouter as Router, Route, Switch, Link as RouterLink } from "react-router-dom";
import { Button, CssBaseline, AppBar, Toolbar, Grid, CardContent, CardActions, Card, Container, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import PropTypes from "prop-types";
import {
  fetchMe,
  selectUser,
  selectUserLoading,
  selectUserFailed
} from './redux/ducks/auth.js'
import { connect } from "react-redux";

import store from './redux/store.js'

//../redux/ducks/diagnosis
import { Provider } from 'react-redux'
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import { createMuiTheme } from '@material-ui/core/styles';
//import './header.css';
//import resultTest from './resultTest.js';
// import ResultController from './results/ResultController.jsx';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        QWERTY
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




class Header extends Component {
  // componentDidMount(){

  //   this.props.fetchMe(localStorage.getItem('access_token'))
  // }

  // logout = () => {

  //   localStorage.removeItem("access_token");
  //     localStorage.removeItem("refresh_token");
  //     localStorage.removeItem("expires_in");
  //     localStorage.removeItem("current_user");
  //     localStorage.removeItem("time_token_acquired");
  //     localStorage.removeItem("role");
  //   this.props.history.push(`/login`);
  //   //  window.location.reload(false);

  // }
  render = () => {

    if (!this.props.userLoading && !this.props.userFailed) {
      const role = this.props.user.role
      console.log(role)
      localStorage.setItem("role", role)
    }



    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      return (
        <Provider store={store}>

          <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar>
                <Typography variant="h6" color="inherit" align="center" noWrap>
                  TRAIL MAKING TEST
                  </Typography>
              </Toolbar>
            </AppBar>
            <main>
              {/* Hero unit */}
              <div >
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Trail Making Test
                    </Typography>
                  <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Trail Making Test is a simple neuropsychological test of cognitive processes, including attention, visual search and scanning, and psychomotor speed.
                    </Typography>
                </Container>
              </div>
              <Router>
                <Container maxWidth="md">
                  <Grid container direction="row" justify="center" alignItems="center" spacing={4}>

                    <Grid item xs={12} sm={6} md={4}>
                      <Card >
                        <CardContent >
                          <Typography gutterBottom variant="h5" component="h2">
                            System Admin
                              </Typography>
                        </CardContent>
                        <CardActions>
                          <RouterLink to={`/login`}>
                            <Button assize="small" color="primary">
                              view
                                </Button>
                          </RouterLink>
                        </CardActions>
                      </Card>
                    </Grid>

                  </Grid>
                </Container>
                <div>
                  <Switch>
                  <Route path="/game" component={Game} />
                <Route path="/result" component={ResultController} />
       
                  </Switch>
                </div>
                {/* <AppRouter/> */}
              </Router>
            </main>
            {/* Footer */}
            <footer >
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                This is a school project for CZ3002.
                </Typography>
              <Copyright />
            </footer>
            {/* End footer */}

            <RouterLink to={`/Logout`}>
            <Button
                  data-testid="loginButton"
                  type="submit"
                  fullWidth
                  
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 460,width:120, height:50, marginTop:30 }}
                >Logout</Button>
            </RouterLink>
          </React.Fragment>

        </Provider>

      )

    }

    else if (localStorage.getItem("role") === "ROLE_DOCTOR" || localStorage.getItem("role") === "ROLE_PATIENT") {

      let isPatient = localStorage.getItem("role") === "ROLE_PATIENT";
      return (
        <Provider store={store}>

          <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar>
                <Typography variant="h6" color="inherit" align="center" noWrap>
                  TRAIL MAKING TEST
                        </Typography>
              </Toolbar>
            </AppBar>
            <main>
              {/* Hero unit */}
              <div >
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Trail Making Test
                          </Typography>
                  <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Trail Making Test is a simple neuropsychological test of cognitive processes, including attention, visual search and scanning, and psychomotor speed.
                          </Typography>
                </Container>
              </div>
              <Router>
                <Container maxWidth="md">
                  <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                    {isPatient ?
                      <Grid item xs={12} sm={6} md={4}>
                        <Card >
                          <CardContent >
                            <Typography gutterBottom variant="h5" component="h2">
                              Game
                              </Typography>
                          </CardContent>
                          <CardActions>
                            <RouterLink to={`/login`}>
                              <Button assize="small" color="primary">
                                Start
                                </Button>
                            </RouterLink>
                          </CardActions>
                        </Card>
                      </Grid>
                      : null}

                    <Grid item xs={12} sm={6} md={4}>
                      <Card >
                        <CardContent >
                          <Typography gutterBottom variant="h5" component="h2">
                            Result
                              </Typography>
                        </CardContent>
                        <CardActions>
                          <RouterLink to={`/login`}>
                            <Button assize="small" color="primary">
                              view
                                </Button>
                          </RouterLink>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                </Container>
                <div>
                  <Switch>
                        <Route path="/game" component={Game} />
                <Route path="/result" component={ResultController} />
                  </Switch>
                </div>
                {/* <AppRouter/> */}
              </Router>
            </main>
            {/* Footer */}
            <footer >
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                This is a school project for CZ3002.
                      </Typography>
              <Copyright />
            </footer>
            {/* End footer */}

            <RouterLink to={`/Logout`}>
            <Button
                  data-testid="loginButton"
                  type="submit"
                  fullWidth
                  
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 460,width:120, height:50, marginTop:30 }}
                >Logout</Button>
            </RouterLink>


          </React.Fragment>

        </Provider>

      )
    }
    else {

      return (
        <loader />
      )
    }


  }
}




Header.propTypes = {


  userLoading: PropTypes.bool.isRequired,
  userFailed: PropTypes.bool,
  user: PropTypes.array.isRequired,
  // classes: PropTypes.object.isRequired,
  // fetchMe: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({

  userLoading: selectUserLoading(state),
  userFailed: selectUserFailed(state),
  user: selectUser(state),


});

const dispatchers = {

  // fetchMe

};


export default connect(mapStateToProps, dispatchers)(Header);
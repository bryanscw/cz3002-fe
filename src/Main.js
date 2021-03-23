// import Link from '@material-ui/core/Link';
// import React, {Component} from 'react';
// import Game from './components/game/Game';
// import SystemAdmin from './components/accounts/AdminPage';
// import ResultController from './components/results/ResultController.jsx';
// import {
//   BrowserRouter as Router,
//   Link as RouterLink,
//   Route,
//   Switch
// } from "react-router-dom";
// import {
//   AppBar,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Container,
//   CssBaseline,
//   Grid,
//   Toolbar,
//   Typography
// } from "@material-ui/core";
// import PropTypes from "prop-types";
// import {
//   selectUser,
//   selectUserFailed,
//   selectUserLoading
// } from './redux/ducks/auth.js'
// import {connect, Provider} from "react-redux";
//
// import store from './redux/store.js'
//
// function Copyright() {
//   return (
//       <Typography variant="body2" color="textSecondary" align="center">
//         {'Copyright © '}
//         <Link color="inherit" href="https://material-ui.com/">
//           QWERTY
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//   );
// }
//
// class Header extends Component {
//   render = () => {
//
//     if (this.props.user.role === "ROLE_ADMIN") {
//       return (
//           <Provider store={store}>
//
//             <React.Fragment>
//               <CssBaseline/>
//               <AppBar position="relative">
//                 <Toolbar>
//                   <Typography variant="h6" color="inherit" align="center"
//                               noWrap>
//                     TRAIL MAKING TEST
//                   </Typography>
//                 </Toolbar>
//               </AppBar>
//               <main>
//                 {/* Hero unit */}
//                 <div>
//                   <Container maxWidth="sm">
//                     <Typography component="h1" variant="h2" align="center"
//                                 color="textPrimary" gutterBottom>
//                       Trail Making Test
//                     </Typography>
//                     <Typography variant="h5" align="center"
//                                 color="textSecondary" paragraph>
//                       Trail Making Test is a simple neuropsychological test of
//                       cognitive processes, including attention, visual search
//                       and scanning, and psychomotor speed.
//                     </Typography>
//                   </Container>
//                 </div>
//                 <Router>
//                   <Container maxWidth="md">
//                     <Grid container direction="row" justify="center"
//                           alignItems="center" spacing={4}>
//
//                       <Grid item xs={12} sm={6} md={4}>
//                         <Card>
//                           <CardContent>
//                             <Typography gutterBottom variant="h5"
//                                         component="h2">
//                               System Admin
//                             </Typography>
//                           </CardContent>
//                           <CardActions>
//                             <RouterLink to={`/systemadmin`}>
//                               <Button assize="small" color="primary">
//                                 view
//                               </Button>
//                             </RouterLink>
//                           </CardActions>
//                         </Card>
//                       </Grid>
//
//                     </Grid>
//                     <Button
//                         data-testid="loginButton"
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="secondary"
//                         href="/logout"
//                         style={{
//                           marginLeft: 400,
//                           width: 120,
//                           height: 50,
//                           marginTop: 30,
//                           marginBottom: 30
//                         }}
//                     >Logout</Button>
//
//                   </Container>
//                   <div>
//                     <Switch>
//                       <Route path="/systemadmin" component={SystemAdmin}/>
//                     </Switch>
//                   </div>
//                   {/* <AppRouter/> */}
//                 </Router>
//               </main>
//               {/* Footer */}
//               <footer>
//                 <Typography variant="subtitle1" align="center"
//                             color="textSecondary" component="p">
//                   This is a school project for CZ3002.
//                 </Typography>
//                 <Copyright/>
//
//
//               </footer>
//               {/* End footer */}
//
//             </React.Fragment>
//
//           </Provider>
//
//       )
//
//     } else if (this.props.user.role === "ROLE_DOCTOR"
//         || this.props.user.role === "ROLE_PATIENT") {
//
//       let isPatient = this.props.user.role === "ROLE_PATIENT";
//       return (
//           <Provider store={store}>
//
//             <React.Fragment>
//               <CssBaseline/>
//               <AppBar position="relative">
//                 <Toolbar>
//                   <Typography variant="h6" color="inherit" align="center"
//                               noWrap>
//                     TRAIL MAKING TEST
//                   </Typography>
//                 </Toolbar>
//               </AppBar>
//               <main>
//                 {/* Hero unit */}
//                 <div>
//                   <Container maxWidth="sm">
//                     <Typography component="h1" variant="h2" align="center"
//                                 color="textPrimary" gutterBottom>
//                       Trail Making Test
//                     </Typography>
//                     <Typography variant="h5" align="center"
//                                 color="textSecondary" paragraph>
//                       Trail Making Test is a simple neuropsychological test of
//                       cognitive processes, including attention, visual search
//                       and scanning, and psychomotor speed.
//                     </Typography>
//                   </Container>
//                 </div>
//                 <Router>
//                   <Container maxWidth="md">
//                     <Grid container direction="row" justify="center"
//                           alignItems="center" spacing={4}>
//                       {isPatient ?
//                           <Grid item xs={12} sm={6} md={4}>
//                             <Card>
//                               <CardContent>
//                                 <Typography gutterBottom variant="h5"
//                                             component="h2">
//                                   Game
//                                 </Typography>
//                               </CardContent>
//                               <CardActions>
//                                 <RouterLink to={`/game`}>
//                                   <Button assize="small" color="primary">
//                                     Start
//                                   </Button>
//                                 </RouterLink>
//                               </CardActions>
//                             </Card>
//                           </Grid>
//                           : null}
//
//                       <Grid item xs={12} sm={6} md={4}>
//                         <Card>
//                           <CardContent>
//                             <Typography gutterBottom variant="h5"
//                                         component="h2">
//                               Result
//                             </Typography>
//                           </CardContent>
//                           <CardActions>
//                             <RouterLink to={`/result`}>
//                               <Button assize="small" color="primary">
//                                 view
//                               </Button>
//                             </RouterLink>
//                           </CardActions>
//                         </Card>
//                       </Grid>
//                     </Grid>
//                     <Button
//                         data-testid="loginButton"
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="secondary"
//                         href="/logout"
//                         style={{
//                           marginLeft: 400,
//                           width: 120,
//                           height: 50,
//                           marginTop: 30,
//                           marginBottom: 30
//                         }}
//                     >Logout</Button>
//                   </Container>
//                   <div>
//                     <Switch>
//                       <Route path="/game" component={Game}/>
//                       <Route path="/result" component={ResultController}/>
//                     </Switch>
//                   </div>
//                   {/* <AppRouter/> */}
//                 </Router>
//               </main>
//               {/* Footer */}
//               <footer
//               >
//                 <Typography variant="subtitle1" align="center"
//                             color="textSecondary" style={{marginTop: 90}}
//                             component="p">
//                   This is a school project for CZ3002.
//                 </Typography>
//                 <Copyright/>
//               </footer>
//               {/* End footer */}
//
//
//             </React.Fragment>
//
//           </Provider>
//
//       )
//     } else {
//
//       return (
//           <loader/>
//       )
//     }
//
//   }
// }
//
// Header.propTypes = {
//
//   userLoading: PropTypes.bool.isRequired,
//   userFailed: PropTypes.bool,
//   user: PropTypes.array.isRequired,
//   // classes: PropTypes.object.isRequired,
//   // fetchMe: PropTypes.func.isRequired,
// };
//
// const mapStateToProps = (state) => ({
//
//   userLoading: selectUserLoading(state),
//   userFailed: selectUserFailed(state),
//   user: selectUser(state),
//
// });
//
// const dispatchers = {
//
//   // fetchMe
//
// };
//
// export default connect(mapStateToProps, dispatchers)(Header);
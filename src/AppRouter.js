import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, Redirect, useRouteMatch, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  refreshTokenLogin,
  selectUserLoading,
  selectUserFailed,
  selectUser,
  selectRefreshToken
} from "./redux/ducks/auth";
// import LoginPage from './login/Login.js';
import ResultController from './results/ResultController.jsx';
// import NewAccount from './systemadmin/NewAccount.js';
//import UpdateUser from './systemadmin/UpdateUser.js';
// import SystemAdmin from './systemadmin/SystemAdmin.js';
// import ViewDiagnosisDoc from './viewDiagnosis/ViewDiagnosisDoc.js';
// import SubmitDiagnosis from './viewDiagnosis/SubmitDiagnosis.js'
// import editDiagnosis from './viewDiagnosis/editDiagnosis.js'
/** This component handles the routing for the app */
class AppRouter extends Component {
  componentDidMount() {
    const { refresh_token, refreshTokenLogin } = this.props;

    if (!refresh_token) refreshTokenLogin(refresh_token);
  }

  render() {
    let routes = [
      // <Route key="LoginPage" path="/login" exact component={LoginPage} />,
      // <Redirect key="LoginRedirect" from="/" exact to="/login" />,
      // <Route key="NewAccount" path="/newaccount" exact component={NewAccount} />,
     // <Route key="UpdateUser" path="/updateuser" exact component={UpdateUser} />,
      
      // <Route key="SystemAdmin" path="/systemadmin" exact component={SystemAdmin} />,
      // <Route key="ViewDiagnosisDoc" path="/viewDiagnosis" exact component={ViewDiagnosisDoc} />,
      // <Route key="Topics" path="/topics" exact component={Topics} />,
      // <Route key="SubmitDiagnosis" path="/SubmitDiagnosis" exact component={SubmitDiagnosis} />,
      // <Route key="editDiagnosis" path="/editDiagnosis/:id" exact component={editDiagnosis} />,
      //<Route key="Home" path="/" exact component={Home} />,
   
     <Route key="ResultController" path="/result" exact component={ResultController} />,
      
    ];

    return (
      <BrowserRouter>
     
         <Switch>
          {/* {routes} */}
          {/* <Redirect from="/" to="/not-found" /> */}
          <Route path="/result">
            <ResultController path="/result"/>
          </Route>
          {/* <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/newaccount">
            <NewAccount />
          </Route>
          <Route path="/systemadmin">
            <SystemAdmin />
          </Route>
         
          <Route path="/viewDiagnosis">
            <ViewDiagnosisDoc/>
            </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path= "/SubmitDiagnosis" >
          <SubmitDiagnosis/>
          </Route>
          <Route path= "/editDiagnosis/:id">
          <editDiagnosis/>
          </Route> */}
          <Route path="/"></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

function Home() {
  return(
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/newaccount">NewAccount</Link>
          </li>
          <li>
            <Link to="/updateuser">UpdateUser</Link>
          </li>
          <li>
            <Link to="/result">Results</Link>
          </li>
          <li>
            <Link to="/viewDiagnosis">Diagnosis</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
          <div>hello world</div>
          <div className='container'>
              <button class='btn'>1</button>
              <button class='btn1'>2</button>
              
              
          </div>
      </div>
  )
}



function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}


AppRouter.propTypes = {
  refresh_token: PropTypes.string,

  userLoading: PropTypes.bool.isRequired,
  userFailed: PropTypes.bool,
  user: PropTypes.object,

  refreshTokenLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userLoading: selectUserLoading(state),
  userFailed: selectUserFailed(state),
  user: selectUser(state),
  refresh_token: selectRefreshToken(state)
});

const dispatchers = {
  refreshTokenLogin
};

export default connect(mapStateToProps, dispatchers)(AppRouter);
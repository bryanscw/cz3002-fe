// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams
// } from "react-router-dom";
// //import Buttons from '@material-ui/core/Button';
// import ResultController from './results/ResultController.jsx';
// import Login from './login/Login copy2.js';
// import NewAccount from './systemadmin/NewAccount.js';
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import AppRouter from "./AppRouter";

// export default function App() {
//   return (

//     <Provider store={store}>
//       <AppRouter />
  

//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/newaccount">NewAccount</Link>
//           </li>
//           <li>
//             <Link to="/results">Results</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/results">
//             <ResultController userType={'doctor'}/>
//           </Route>
//           <Route path="/login">
//             <Login />
//           </Route>
//           <Route path="/newaccount">
//             <NewAccount />
//           </Route>
//           <Route path="/topics">
//             <Topics />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//     </Provider>
//   );
// }

// function Home() {
//     return(
//         <div>
//             <div>hello world</div>
//             <div className='container'>
//                 <button class='btn'>1</button>
//                 <button class='btn1'>2</button>
                
                
//             </div>
//         </div>
//     )
// }



// function Topics() {
//     let match = useRouteMatch();
  
//     return (
//       <div>
//         <h2>Topics</h2>
  
//         <ul>
//           <li>
//             <Link to={`${match.url}/components`}>Components</Link>
//           </li>
//           <li>
//             <Link to={`${match.url}/props-v-state`}>
//               Props v. State
//             </Link>
//           </li>
//         </ul>
  
//         {/* The Topics page has its own <Switch> with more routes
//             that build on the /topics URL path. You can think of the
//             2nd <Route> here as an "index" page for all topics, or
//             the page that is shown when no topic is selected */}
//         <Switch>
//           <Route path={`${match.path}/:topicId`}>
//             <Topic />
//           </Route>
//           <Route path={match.path}>
//             <h3>Please select a topic.</h3>
//           </Route>
//         </Switch>
//       </div>
//     );
//   }
  
//   function Topic() {
//     let { topicId } = useParams();
//     return <h3>Requested topic ID: {topicId}</h3>;
//   }
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRouter from "./AppRouter";

/** This component is the entrypoint of the react app */
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;

import React from "react";
import {Route} from "react-router-dom";
import ResultHomePage from "./ResultHomePage";
import ResultPage from "./ResultPage";

const PatientRouter = [
  <Route
      key="ResultHomePage"
      path="/"
      exact
      component={ResultHomePage}
  />,
  <Route
      key="ResultPage"
      path="/results/:resultId"
      exact
      component={ResultPage}
  />,
  <Route
      key="DiagnosisPage"
      path="/diagnosis/:resultId"
      exact
      component={DiagnosisPage}
  />,
  <Route
      key="GamePage"
      path="/game/:resultId"
      exact
      component={GamePage}
  />,

]

export default PatientRouter;
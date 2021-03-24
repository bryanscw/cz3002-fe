import React from "react";
import {withRouter, Route} from "react-router-dom";
import ResultHomePage from "./PatientHomePage";
import ResultPage from "./ResultPage";
import DiagnosisPage from "./DiagnosisPage";
import GamePage from "./GamePage";

const PatientRouter = [
  <Route
      key="ResultHomePage"
      path="/"
      exact
      component={ResultHomePage}
  />,
  <Route
      key="ResultPage"
      path="/result/:resultId"
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
      component={withRouter(GamePage)}
  />,

]

export default PatientRouter;
import React from "react";
import {Route} from "react-router-dom";
import ResultHomePage from "./ResultHomePage";
import ResultPage from "./ResultPage";

const PatientRouter = [
  <Route
      key="ViewResults"
      path="/"
      component={ResultHomePage}
  />,
  <Route
      key="ResultPage"
      path="/results/:resultId"
      exact
      component={ResultPage}
  />,

]

export default PatientRouter;
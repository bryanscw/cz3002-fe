import React from "react";
import {Route} from "react-router-dom";
import Result from "./Result";

const PatientRouter = [
  <Route
      key="ViewResults"
      path="/"
      component={Result}
  />,
]

export default PatientRouter;
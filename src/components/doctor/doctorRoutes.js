import React from "react";
import {Route} from "react-router-dom";
import ViewDiagnosisDoc from "./diagnosis/ViewDiagnosisDoc";
import DoctorResult from "./results/DoctorResult";

const DoctorRouter = [
  <Route
      key="ViewDiagnosis"
      path="/"
      component={ViewDiagnosisDoc}
  />,
  <Route
      key="ViewResults"
      path="/"
      component={DoctorResult}
  />,
]

export default DoctorRouter;
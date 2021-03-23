import React from "react";
import {Route} from "react-router-dom";
import ViewDiagnosisDoc from "./Diagnosis/ViewDiagnosisDoc";
import DoctorResult from "./Result/DoctorResult";

const DoctorRouter = [
  <Route
      key="ViewResults"
      path="/"
      component={DoctorResult}
  />,
  <Route
      key="ViewDiagnosis"
      path="/view-diagnosis/:resultId"
      component={ViewDiagnosisDoc}
  />,
]

export default DoctorRouter;
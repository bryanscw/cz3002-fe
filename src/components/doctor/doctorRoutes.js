import React from 'react';
import { Route } from 'react-router-dom';
import DoctorHomePage from './DoctorHomePage';

const DoctorRouter = [
  <Route
    key="DoctorHomePage"
    path="/"
    component={DoctorHomePage}
  />,
  // <Route
  //     key="CreateTest"
  //     path="/view-diagnosis/:resultId"
  //     component={ViewDiagnosisDoc}
  // />,
  // <Route
  //     key="CreateDiagnosis"
  //     path="/submit-diagnosis/:resultId"
  //     component={CreateDiagnosisPage}
  // />,
  // <Route
  //   key="CreateTest"
  //   path="/create-test"
  //   component={CreateTestPage}
  // />,
];

export default DoctorRouter;
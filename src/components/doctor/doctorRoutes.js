import React from 'react';
import { Route } from 'react-router-dom';
import DoctorHomePage from './DoctorHomePage';
import CreateTestPage from './CreateTestPage';
import ResultPage from './ResultPage';
import DiagnosisPage from './DiagnosisPage';

const DoctorRouter = [
  <Route
    key="DoctorHomePage"
    path="/dashboard"
    component={DoctorHomePage}
  />,
  <Route
    key="CreateTest"
    path="/create-test"
    component={CreateTestPage}
  />,
  <Route
    key="ResultPage"
    path="/result/:resultId"
    component={ResultPage}
  />,
  <Route
    key="DiagnosisPage"
    path="/diagnosis/:resultId"
    component={DiagnosisPage}
  />,
  // <Route
  //   key="ResultPage"
  //   path="diagnosis/:resultId/create"
  //   component={CreateDiagnosisPage}
  // />,
];

export default DoctorRouter;
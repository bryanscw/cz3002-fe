import React from 'react';
import { Route } from 'react-router-dom';
import DoctorHomePage from './DoctorHomePage';
import ResultPage from './ResultPage';
import DiagnosisPage from './DiagnosisPage';
import PatientsPage from './PatientsPage';
import ResultsPage from './ResultsPage';
import PatientResultsPage from './PatientResultsPage';
import PendingDiagnosisPage from './PendingDiagnosisPage';
import CreateDiagnosisPage from './CreateDiagnosisPage';

const DoctorRouter = [
  <Route
    key="DoctorHomePage"
    path="/dashboard"
    component={DoctorHomePage}
  />,
  <Route
    key="PatientsPage"
    path="/patients"
    component={PatientsPage}
  />,
  <Route
    key="PatientResultsPage"
    path="/patient/:userEmail"
    component={PatientResultsPage}
  />,
  <Route
    key="ResultsPage"
    path="/results"
    component={ResultsPage}
  />,
  <Route
    key="ResultPage"
    path="/result/:resultId"
    component={ResultPage}
  />,
  <Route
    key="PendingDiagnosisPage"
    path="/diagnosis/pending"
    component={PendingDiagnosisPage}
  />,
  <Route
    key="DiagnosisPage"
    path="/diagnosis/:resultId"
    component={DiagnosisPage}
  />,
  <Route
    key="ResultPage"
    path="/diagnosis/:resultId/create"
    component={CreateDiagnosisPage}
  />,
];

export default DoctorRouter;
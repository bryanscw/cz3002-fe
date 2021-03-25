import React from 'react';
import { Route } from 'react-router-dom';
import DoctorHomePage from './DoctorHomePage';
import CreateTestPage from './CreateTestPage';

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
];

export default DoctorRouter;
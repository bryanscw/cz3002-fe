import React from "react";
import {Route} from "react-router-dom";
import ViewDiagnosisDoc from "./Diagnosis/ViewDiagnosisDoc";
import DoctorResult from "./Result/DoctorResult";
import SubmitDiagnosis from "./Diagnosis/SubmitDiagnosis";

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
    <Route
        key="SubmitDiagnosis"
        path="/submit-diagnosis/:resultId"
        component={SubmitDiagnosis}
    />,
]

export default DoctorRouter;
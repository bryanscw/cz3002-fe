import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import DiagnosisDetailDoc from './DiagnosisDetailDoc.jsx'
import SubmitDiagnosis from './SubmitDiagnosis.js'

export default function ViewDiagnosisDoc(props){
    // receives resultHistory - list of past test performances,
    // which includes as attributes: time, test mode, completion time, error rate
    let match = useRouteMatch();
    return (
        <Router>

        <div>
            <ul>
                {props.diagnosisHistory.map(
                    (diagnosisDetailDoc) => 
                    <Link key={diagnosisDetailDoc.id.toString()} to={`${match.url}/DiagnosisDetailDoc/${diagnosisDetailDoc.id}`}>
                        <li>Diagnosis id: {diagnosisDetailDoc.id}</li>
                    </Link>
                )}
            </ul>
            <ul>
            <Link to="./SubmitDiagnosis"> <button>Submit NEW Diagnosis</button></Link>
            </ul>
            <Switch>
                <Route path= "/SubmitDiagnosis" component={SubmitDiagnosis}></Route>
                <Route path={`${match.path}/DiagnosisDetailDoc/:diagnosisDetailDocId`} children={<DiagnosisDetailDoc diagnosisHistory={props.diagnosisHistory}/>}/>
               
            </Switch>
        </div>
                    
        </Router>
    )
}

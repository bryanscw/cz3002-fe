import {
    //BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    //useParams
} from "react-router-dom";

import PatientResult from './PatientResult'
export default function DoctorResult(props){
    let match = useRouteMatch();
    return (
        
        <div>
            <ul>
                {props.patientList.map(
                    (patientDetails) => 
                    <Link key={patientDetails.id.toString()} to={`${match.url}/patientDetails/${patientDetails.id}`}>
                        <li>Patient id: {patientDetails.id}</li>
                    </Link>
                )}
            </ul>
            <Switch>
                <Route path={`${match.path}/patientDetails/:patientDetailsId`} children={<PatientResult patientList={props.patientList}/>}/>
            </Switch>
        </div>
    )
}
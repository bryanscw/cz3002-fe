import {
    //BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    //useParams
} from "react-router-dom";

import ResultDetails from './ResultDetails.jsx'

export default function ResultList(props){
    // receives resultHistory - list of past test performances,
    // which includes as attributes: time, test mode, completion time, error rate
    let match = useRouteMatch();
    return (
        <div>
            <ul>
                {props.resultHistory.map(
                    (resultDetails) => 
                    <Link key={resultDetails.id.toString()} to={`${match.url}/resultDetails/${resultDetails.id}`}>
                        <li>Test id: {resultDetails.id}</li>
                    </Link>
                )}
            </ul>
            <Switch>
                <Route path={`${match.path}/resultDetails/:resultDetailsId`} children={<ResultDetails resultHistory={props.resultHistory}/>}/>
            </Switch>
        </div>
    )
}

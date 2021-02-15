import {
    useParams
} from "react-router-dom";

export default function ResultDetails(props) {
    // receives as prop resultHistory- a list which contains resultDetail objects,
    // including attributes: time, test mode, completion time, error rate
    let {resultDetailsId} = useParams()
    let resultDetails = props.resultHistory[resultDetailsId]
    return (
        // temporary, we're not sure yet what data we will get actually
        // no test mode coming from back end yet, default it to null
        <ul>
            <li>Test id: {resultDetailsId}</li>
            <li>Start time: {resultDetails.createdDate.toString()}</li>
            <li>Completion time: {new Date(resultDetails.createdDate + resultDetails.time).toString()}</li>
            <li>Error rate: {1-resultDetails.accuracy}</li>
        </ul>
    )
}
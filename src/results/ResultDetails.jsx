import {
    useParams
} from "react-router-dom";

export default function ResultDetails(props) {
    // receives as prop resultHistory- a list which contains resultDetail objects,
    // including attributes: time, test mode, completion time, error rate
    const {resultDetailsId} = useParams()
    const resultDetails = props.resultHistory.find(rd => {return rd.id.toString() === resultDetailsId.toString()})
    return (
        // temporary, we're not sure yet what data we will get actually
        // no test mode coming from back end yet, default it to null
        <ul>
            <li>Result id: {resultDetailsId}</li>
            <li>Created by: {resultDetails.createdBy}</li>
            <li>Created date: {resultDetails.createdDate}</li>
            <li>Last modified by: {resultDetails.lastModifiedBy}</li>
            <li>Last modified date: {resultDetails.lastModifiedDate}</li>
            <li>Time: {resultDetails.time}</li>
        </ul>
    )
}
import {Link, useParams} from "react-router-dom";


export default function ResultDetails(props) {
    // receives as prop resultHistory- a list which contains resultDetail objects,
    // including attributes: time, test mode, completion time, error rate
    const {resultDetailsId} = useParams()
    const resultDetails = props.resultHistory.find(rd => {
        return rd.id.toString() === resultDetailsId.toString()
    })
    return (
        <ul>
            <li>Result id: {resultDetailsId}</li>
            <li>Created by: {resultDetails.createdBy}</li>
            <li>Created date: {resultDetails.createdDate}</li>
            <li>Last modified by: {resultDetails.lastModifiedBy}</li>
            <li>Last modified date: {resultDetails.lastModifiedDate}</li>
            <li>Time: {resultDetails.time}</li>
            <li>Accuracy: {resultDetails.accuracy}</li>
            <Link to={`/viewDiagnosis/${resultDetailsId}`}>
                <button>
                    Diagnosis
                </button>
            </Link>

        </ul>
    );
}
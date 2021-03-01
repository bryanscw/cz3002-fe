import {
    useParams
} from "react-router-dom";
import './Diagnosis.css';

export default function ResultDetails(props) {
    let {diagnosisDetailDocId} = useParams()
    let diagnosisDetailDoc = props.diagnosisHistory[diagnosisDetailDocId]
    return (
  
        <div className="wrapper">
            <h1>Diagnosis</h1>
            <form>
            <fieldset>
                <label>
                    <p>Diganosis Id: {diagnosisDetailDocId}</p>
                </label>
                <label>
                    <p>Diagonosis Time: {diagnosisDetailDoc.created_Date.toString()}</p>
                </label>
                <label>
                    <p>Patient Name :{diagnosisDetailDoc.patientName}</p>
                </label>
                <label>
                    <p>Category :  {diagnosisDetailDoc.label}</p>
                </label>
                <label>
                    <p>Detailed Diganosis  : {diagnosisDetailDoc.description}</p>
                </label>
            </fieldset>
            <button type="edit">edit</button>
            <button type="delete">delete</button>
            </form>
        </div>

    
    )
}
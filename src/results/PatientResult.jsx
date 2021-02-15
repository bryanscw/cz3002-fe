import {
    useParams
} from "react-router-dom";
import ResultList from './ResultList.jsx'

export default function PatientResult(props){
    let {patientDetailsId} = useParams()
    console.log(patientDetailsId)
    let patientDetails = props.patientList[patientDetailsId]
    return <ResultList resultHistory={patientDetails.resultHistory}/>
}
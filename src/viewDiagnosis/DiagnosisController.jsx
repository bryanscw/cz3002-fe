import React from 'react'
import ViewDiagnosisPatient from './ViewDiagnosisPatient.jsx'
import ViewDiagnosisDoc from './ViewDiagnosisDoc.jsx'

export default function DiagnosisController(props){
    console.log(props.userType)
    if (props.userType === 'patient'){
        // result history data fetch to be implemented
        return <ViewDiagnosisPatient diagnosisPatient={getMockDiagnosisPatient()}/>
    } else {
        //WIP
        return <ViewDiagnosisDoc diagnosisHistory={getMockDiagnosisHistory()}/>
    }
}

function getMockDiagnosisPatient(){
    //hard coded mock data, temporary
    return [
        {
            id: 0,
            created_Date: '2021/02/16',
            created_by:'doctorA',
            label :'moderate' ,
            description:'comment'
        },
       
    ]
}


function getMockDiagnosisHistory(){
    //hard coded mock data, temporary
    return [
        {
            id: 0,
            created_Date: '2021/02/16',
            patientName : 'patient A',
            created_by:'doctorA',
            label :'moderate' ,
            description:'comment'
        },
        {
            id: 1,
            created_Date: '2021/02/16',
            created_by:'doctorb',
            patientName : 'patient b',
            label :'High' ,
            description:'comment'
        }
       
    ]
}
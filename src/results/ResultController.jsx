import React from 'react'
import ResultList from './ResultList.jsx'
import DoctorResult from './DoctorResult.jsx'

export default function ResultController(props){
    console.log(props.userType)
    if (props.userType === 'patient'){
        // result history data fetch to be implemented
        return <ResultList resultHistory={getMockResultHistory()}/>
    } else {
        //WIP
        return <DoctorResult patientList={getMockPatientList()}/>
    }
}

function getMockResultHistory(){
    //hard coded mock data, temporary
    return [
        {
            accuracy: 0.0,
            createdBy: 'string',
            createdDate: new Date(),
            id: 0,
            lastModifiedBy: 'string',
            lastModifiedDate: new Date(),
            time: 0,
            user: null
        },
        {
            accuracy: 0.0,
            createdBy: 'string',
            createdDate: new Date(),
            id: 1,
            lastModifiedBy: 'string',
            lastModifiedDate: new Date(),
            time: 0,
            user: null
        }
    ]
}

function getMockPatientList(){
    const resultHistory = getMockResultHistory()
    return [
        {
            id: 0,
            resultHistory: resultHistory
        },
        {
            id: 1,
            resultHistory: resultHistory
        }
    ]
}
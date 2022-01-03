import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Table, Row, th } from "reactstrap";


const Search = ({search_term}) => {

    const [data, setData] = useState(null);

    useEffect(async () => {
        const res = await axios.post(`http://127.0.0.1:5000/search/`, JSON.stringify(search_term));
        
        setData(data => {
            let newData = [];
            for(let i of Object.keys(res.data))
                newData.push({
                    'PatientID': res.data[i]['PatientID'], 
                    'PatientFirstName': res.data[i]['PatientFirstName'], 
                    'PatientLastName': res.data[i]['PatientLastName'], 
                    'Gender': res.data[i]['Gender'], 
                    'TestName': res.data[i]['TestName'], 
                    'MostRecentTestDate': res.data[i]['MostRecentTestDate'], 
                    'MostRecentLabResult': res.data[i]['MostRecentLabResult']
                });

            return newData;
        });
    }, []);
    let result = [];
    if(data) {
        result = data.map(record => (
            <tr key={uuid()}>
                <th>{record.PatientID}</th>
                <th>{record.PatientFirstName}</th>
                <th>{record.PatientLastName}</th>
                <th>{record.Gender}</th>
                <th>{record.TestName}</th>
                <th>{record.MostRecentTestDate}</th>
                <th>{record.MostRecentLabResult}</th>
            </tr>
        ));
    }

    let finalResult
    if(data)
        finalResult = (
            <Table responsive hover striped>
                <thead>
                    <tr>
                        <th>PatientID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Test Name</th>
                        <th>Test Date</th>
                        <th>Test Result</th>
                    </tr>
                </thead>
                <tbody>{result}</tbody>
            </Table>
        );
    else
        finalResult = <h1>Loading...</h1>

    return finalResult;

    

}

export default Search;
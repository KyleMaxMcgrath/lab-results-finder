import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function Row({patient}) {
    const [open, setOpen] = React.useState(false);
    console.log(patient);
          return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{patient[0].PatientID}</TableCell>
          <TableCell>{patient[0].PatientFirstName}</TableCell>
          <TableCell>{patient[0].PatientLastName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Test Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Test Name</TableCell>
                        <TableCell align="right">Test Date</TableCell>
                        <TableCell align="right">Test Result</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {patient.map((patient) => (
                      <TableRow key={uuid()}>
                            <TableCell align="right">{patient.PatientFirstName}</TableCell>
                            <TableCell align="right">{patient.PatientLastName}</TableCell>
                            <TableCell align="right">{patient.Gender}</TableCell>
                            <TableCell align="right">{patient.TestName}</TableCell>
                            <TableCell align="right">{patient.MostRecentTestDate}</TableCell>
                            <TableCell align="right">{patient.MostRecentLabResult}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>);
  }

const Search = ({search_term}) => {

    const [data, setData] = useState(null);

    useEffect(async () => {
        const res = await axios.post(`http://127.0.0.1:5000/search/`, JSON.stringify(search_term));
        
        setData(data => {
            let newData = [];
            console.log(res.data);
            for(let patient of res.data) {
              let patientRecords = [];
              for(let record of Object.keys(JSON.parse(patient)))  {
                
                  patientRecords.push({
                    'PatientID': JSON.parse(patient)[record]['PatientID'], 
                    'PatientFirstName': JSON.parse(patient)[record]['PatientFirstName'], 
                    'PatientLastName': JSON.parse(patient)[record]['PatientLastName'], 
                    'Gender': JSON.parse(patient)[record]['Gender'], 
                    'TestName': JSON.parse(patient)[record]['TestName'], 
                    'MostRecentTestDate': JSON.parse(patient)[record]['MostRecentTestDate'], 
                    'MostRecentLabResult': JSON.parse(patient)[record]['MostRecentLabResult']
                });
              }
              newData.push(patientRecords);
              }
            return newData;
        });
    }, []);
    let result = {};
    // if(data) {
    //     result = data.map(record => (
    //         <tr key={uuid()}>
    //             <th>{record.PatientID}</th>
    //             <th>{record.PatientFirstName}</th>
    //             <th>{record.PatientLastName}</th>
    //             <th>{record.Gender}</th>
    //             <th>{record.TestName}</th>
    //             <th>{record.MostRecentTestDate}</th>
    //             <th>{record.MostRecentLabResult}</th>
    //         </tr>
    //     ));
    // }

    let finalResult;
    if(data)
        finalResult = (
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Patient ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(row=>(
                    <Row key={uuid()} patient={row} />
                  ))}
                </TableBody>
            </Table>
            </TableContainer>
        )
        /* finalResult = (
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
        ); */
    else
        finalResult = <h1>Loading...</h1>

    return finalResult;

    

}

export default Search;
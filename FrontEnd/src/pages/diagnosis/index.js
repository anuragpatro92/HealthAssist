import { AppBar, Tab, Tabs } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiagnosisList } from '../../redux/actions/diagnosis-action';
import PatientInfoCard from './../../components/patient-select/patient-info-card';
import DiagnosisTimeline from './DiagnosisTimeline';
import { Filters } from './Filters';
import { useHistory } from 'react-router-dom';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id.substring(row._id.length - 8)}
        </TableCell>
        <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(row.updated_at).toLocaleDateString()}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.patient_id.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit style={{ marginTop: 24, marginBottom: 24, border: "2px solid black" }}>
          <AppBar position="static" color="default">
              <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                  centered
              >
                <Tab label="Diagnosis Details"/>
                <Tab label="Patient Details"/>
              </Tabs>
              </AppBar>
                {value === 0 && <DiagnosisTimeline diagnosis={row}/>}
                {value === 1 && <PatientInfoCard patient={row.patient_id}/>}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function DiagnosisList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const diagList  = useSelector(state => state.diagnosisReducer.diagnosisList);
  const [filteredDiagList, setFilteredDiagList] = React.useState(diagList);
  
  const user  = useSelector(state => state.authReducer.user);
  const initFilters = history.location['filters'] || null;
  
  useEffect(() => {
    if(!diagList)
      dispatch(getDiagnosisList(user._id))
  }, [])  
  const applyFilters = (filters) => {
      let deep_copy_diagList = [...diagList];
      if(filters.patient !== 'None') {
        deep_copy_diagList =  deep_copy_diagList.filter(d => d.patient_id.name === filters.patient)
      }
      if(filters.status !== 'All') {
        deep_copy_diagList =  deep_copy_diagList.filter(d => d.status === filters.status)
      }
      if(filters.sortOrder === 'oldest') {
        deep_copy_diagList.reverse()
      }
      setFilteredDiagList(deep_copy_diagList);  
  }
  return (<>
    {filteredDiagList &&
    <>
    <Filters list={diagList} applyFilters={applyFilters} initFilters={initFilters}/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Created on</TableCell>
            <TableCell>Updated on</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Patient Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDiagList.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer></>}
    </>
  );
}

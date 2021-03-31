import React , {useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, AppBar, Box } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch , useSelector } from 'react-redux';
import { getDiagnosisList } from '../../redux/actions/diagnosis-action';
import { Divider } from '@material-ui/core';
import DiagnosisTimeline from './DiagnosisTimeline';
import PatientInfoCard from './../../components/patient-select/patient-info-card';

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
  const diagList  = useSelector(state => state.diagnosisReducer.diagnosisList);
  const user  = useSelector(state => state.authReducer.user);

  useEffect(() => {
    if(!diagList)
      dispatch(getDiagnosisList(user._id))
  }, [])  
  
  return (<>
    {diagList &&
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
          {diagList.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  );
}

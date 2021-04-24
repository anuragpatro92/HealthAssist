
import { React, useState, useEffect } from 'react';
import { Paper, Typography, Box, FormControl, Select, InputLabel, MenuItem, 
    Button, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: 16
    },
  }));
  
export const Filters = (props) => {
    const { list, applyFilters, initFilters } = props;
    const defaultFilters = {
        patient: 'None',
        sortOrder: 'latest',
        status: 'All'
    }
    const classes = useStyles();
    const [filters, setFilters] = useState(initFilters || defaultFilters);
    const [expanded, setExpanded] = useState(initFilters ? true: false);
    const getPatientOptions = () => {
        return ['None' , ...Array.from(new Set(list.map(l => l.patient_id.name)))]
    }
    const resetFilters = () => {
        setFilters(initFilters);
        applyFilters(initFilters);
    }
    const handleChange = (event) => { 
        let deep_copy_filters = {...filters};
        deep_copy_filters[event.target.name] = event.target.value;
        setFilters(deep_copy_filters);
    }
    useEffect(() => {
        if(initFilters) {
            applyFilters(initFilters);
        }
    }, [])
    return (
        <Accordion className={classes.root} expanded={expanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setExpanded(!expanded)}
        >
        <Typography className={classes.heading}>FILTERS</Typography>
        </AccordionSummary>
                <AccordionDetails>
                <Box width="100%">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                <FormControl variant="outlined" className={classes.formControl}  style={{width: 300}}>
                        <InputLabel id="patient-label">Select Patient</InputLabel>
                        <Select
                            labelId="patient-label"
                            id="patient"
                            name="patient"
                            value={filters.patient}
                            onChange={handleChange}
                            label="Select Patient"
                        >
                            {getPatientOptions().map(o => <MenuItem value={o}>{o}</MenuItem>)}
                        </Select>
                </FormControl>
                 <FormControl variant="outlined" className={classes.formControl}  style={{width: 200}}>
                        <InputLabel id="sort-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sort"
                            name="sortOrder"
                            value={filters.sortOrder}
                            onChange={handleChange}
                            label="Sort By"
                        >
                            <MenuItem value={"latest"}>Latest</MenuItem>
                            <MenuItem value={"oldest"}>Oldest</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}  style={{width: 200}}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"In Progress"}>In Progress</MenuItem>
                            <MenuItem value={"Completed"}>Completed</MenuItem>
                            <MenuItem value={"Diagnosis Completed"}>Diagnosis Completed</MenuItem>
                        </Select>
                    </FormControl>
            </Box>
            <Box mt={3}>
                <Button variant="outlined" color="primary" style={{marginRight: 30}} onClick={resetFilters}>
                    Reset Filters
                </Button>
                <Button variant="contained" color="primary" onClick={() => applyFilters(filters)} >
                    Apply Filters
                </Button>
            </Box>
                </Box>
               
                </AccordionDetails>
            </Accordion>
    )
}
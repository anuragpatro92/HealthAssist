import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

export default function DiagnosisList() {
  const classes = useStyles();
  const dispatch = useDispatch();


  return (
    <div className={classes.root}>
            HELLO
    </div>
  );
}

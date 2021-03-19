import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({

}));

export default function Dashboard() {
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {

  }, [])
  return (
      <>
      <Typography variant="h4" className="s-title">
         Welcome to Health Assist!!
      </Typography>
      </>
  );
}

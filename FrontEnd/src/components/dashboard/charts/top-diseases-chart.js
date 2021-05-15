import { Avatar, Box, Chip, Paper, Typography, Divider ,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import React from 'react';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
        padding: "1rem",
        width: '100%'
  },
  avatar: {
      width: 100,
      height: 100
  },
  infoBox: {
    display: "flex",
    alignItems: "left"
  },
  infoField: {
      flex: 2,
      textAlign: "right"
  },
  infoValue: {
    flex: 3,
    paddingLeft: 24,
    fontSize: 18
},
submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mr2: {
      marginRight: 12,
      marginTop: 12
  }
}));

export default function TopDiseasesChart(props) {
  const classes = useStyles();
  const { diseases } = props;
  
  const optionsForTopDiseases = {
    colors: ['#2b908f', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      type: 'column',
      backgroundColor : '#424242',
      style: {
        fontFamily: '\'Unica One\', sans-serif'
    },
    plotBorderColor: '#606063'
  },
  title: {
    text: '',
    style: {
      color: '#ffffff',
      font: 'bold 16px'
   }
  },
  xAxis: {
      type: 'category',
      labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
              color: '#ffffff'
          }
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Diseases',
          style: {
            color: '#ffffff',
            font: 'bold 16px'
         }
      }
  },
  legend: {
      enabled: false
  },
  credits: {
    enabled: false
 },
  tooltip: {
      pointFormat: 'Count <b>{point.y:.0f}</b>'
  },
  series: [{
      name: 'handle',
      data: diseases,//this.props.tweetsFrequencyWiseDaily.arr,
      dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.0f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
  }]



  };


  return (
    <Paper className={classes.paper}  elevation={3}>
       <Grid container spacing={1}>
        <Grid item xs={12}>
            <Typography variant="h5" className="s-title" >
                Most Frequent Diseases
            </Typography>
        </Grid>
        <Grid item xs={12}>
        <HighchartsReact highcharts={Highcharts} options={optionsForTopDiseases} />
        </Grid>
        </Grid>         
      </Paper>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { teal , lightBlue} from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { green, red, orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  card: {
    backgroundColor: lightBlue[900],
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  saveButton: {
    backgroundColor: lightBlue[900],
    color: "white"
  },
  list: {
    width: 350,
    height: 230,
    backgroundColor: lightBlue[800],
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  strong : {
    color: green[600]
  },
  moderate : {
    color: orange[800]
  },
  weak : {
    color: red[600]
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function DrugSelector(props) {
  const classes = useStyles();
  const {suggestedDrugs, setPrescribedDrugs } = props;
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(suggestedDrugs.drugList);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
 
  const getDrugStatus = (drug) => {
     if(suggestedDrugs.goodDrugs.has(drug)) return <ThumbUpIcon className={classes.strong} title="Recommended"/>;
     if(suggestedDrugs.badDrugs.has(drug)) return <ThumbDownIcon className={classes.weak} title="Not recommended"/>;
     return 'Unknown';
  }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleDrugSearch = (event) => {
     setLeft(suggestedDrugs.drugList.filter(d => d.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const customList = (title, items) => (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}

      />
      <Divider />
      {title === 'Drug List' && 
        <TextField 
          id="filled-search" label="Search drugs" type="search" variant="filled" 
          fullWidth={true}
          onChange={handleDrugSearch}
        />}
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
              {title === 'Drug List' &&  getDrugStatus(value)}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {title === 'Prescription' && 
      <>
        <Divider />
        <Button className={classes.saveButton} fullWidth variant="contained" onClick={() =>{
              setPrescribedDrugs(rightChecked);
        }}>
          Save
        </Button>
        </>
      }
      
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList('Drug List', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Prescription', right)}</Grid>
    </Grid>
  );
}

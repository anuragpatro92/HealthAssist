import { makeStyles } from '@material-ui/core/styles';
import React , {useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getDiagnosisList } from '../../redux/actions/diagnosis-action';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

export default function DiagnosisList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const diagList  = useSelector(state => state.diagnosisReducer.diagnosisList);
  const user  = useSelector(state => state.authReducer.user);

  useEffect(() => {
    if(!diagList)
      dispatch(getDiagnosisList(user._id))
  }, [])
  return (
    <div className={classes.root}>
            HELLO
    </div>
  );
}

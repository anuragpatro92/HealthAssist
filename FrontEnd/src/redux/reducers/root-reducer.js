import { combineReducers } from "redux";
import utilReducer from './util-reducer';
import patientReducer from './patient-reducer';
import metaReducer from './meta-reducer';
import authReducer from './auth-reducer';
import diagnosisReducer from './diagnosis-reducer';

import {
  RESET_ALL_STATE
} from "../../redux/actions/action-types";

const appReducer = combineReducers({
    authReducer,
    utilReducer,
    patientReducer,
    metaReducer,
    diagnosisReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_ALL_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

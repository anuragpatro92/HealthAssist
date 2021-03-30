import { GET_DIAGNOSIS_LIST } from "../actions/action-types";

const initialState = {
    diagnosisList: null,
}

const diagnosisReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DIAGNOSIS_LIST: {
        return {
            ...state,
            diagnosisList : action.payload
         };
      }
    default:
        return state;
    }
  }
  
  export default diagnosisReducer;
import { GET_DIAGNOSIS_LIST, SET_MOST_RECENT_DIAGNOSIS } from "../actions/action-types";

const initialState = {
    diagnosisList: null,
    mostRecent: null
}

const diagnosisReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DIAGNOSIS_LIST: {
        return {
            ...state,
            diagnosisList : action.payload
         };
      }
      case SET_MOST_RECENT_DIAGNOSIS: {
        return {
            ...state,
            mostRecent : action.payload
         };
      }
    default:
        return state;
    }
  }
  
  export default diagnosisReducer;
import { GET_SYMPTOM_LIST } from "../actions/action-types";

const initialState = {
    symptomList: null
}

const metaReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SYMPTOM_LIST: {
          return {
             ...state,
             symptomList : action.payload
          };
      }
    default:
        return state;
    }
  }
  
  export default metaReducer;
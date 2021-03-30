import { GET_SYMPTOM_LIST, GET_DISEASE_LIST } from "../actions/action-types";

const initialState = {
    symptomList: null,
    diseaseList: null
}

const metaReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SYMPTOM_LIST: {
          return {
             ...state,
             symptomList : action.payload
          };
      }
      case GET_DISEASE_LIST: {
        return {
            ...state,
            diseaseList : action.payload
         };
      }
    default:
        return state;
    }
  }
  
  export default metaReducer;
import { GET_PATIENT_LIST } from "../actions/action-types";

const initialState = {
    patientList: null
}

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PATIENT_LIST: {
          return {
             ...state,
             patientList : action.payload
          };
      }
    default:
        return state;
    }
  }
  
  export default patientReducer;
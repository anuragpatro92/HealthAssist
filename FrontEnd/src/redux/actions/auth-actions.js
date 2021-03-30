import axios from "axios";
import { DOCTOR_REGISTERED,SET_CURRENT_USER,RESET_ALL_STATE } from './action-types';
import { API_BASE } from '../../config/app-config';
import {startLoader, stopLoader, setMessage } from './util-action';

// Set logged in user
export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

// Doctor Sign Up
export const doctorSignUp = (userData,history) => {
  return async(dispatch) => {
      try {
          dispatch(startLoader());
          const resp = await axios.post(`${API_BASE}/doctor`, userData);
          
          dispatch(stopLoader());
          if(resp.data.status === "success") {
              dispatch({
                type: DOCTOR_REGISTERED,
                payload: resp.data
              })
              history.push("/signIn")
              dispatch(setMessage({
                msg: resp.data.msg,
                name: 'success'
               }));
          }else{
            dispatch(setMessage({
              msg: resp.data.msg,
              name: 'danger'
          }));
          }  
      }catch(e) {
          dispatch(stopLoader());
          dispatch(setMessage({
              msg: e.message,
              name: 'danger'
          }))
      }
  };
}

// Doctor Sign In
export const signIn = (userData,history) => {
  return async(dispatch) => {
      try {
          dispatch(startLoader());
          const resp = await axios.post(`${API_BASE}/doctor/auth`, userData);
          dispatch(stopLoader());
          if(resp.data.status === "success") {
              localStorage.setItem("loggedInUserInfo", JSON.stringify(resp.data));
              dispatch(setCurrentUser(resp.data));
              history.push("/")
          }else{
            dispatch(setMessage({
              msg: resp.data.msg,
              name: 'danger'
          }));
          } 
      }catch(e) {
          dispatch(stopLoader());
          dispatch(setMessage({
              msg: e.message,
              name: 'danger'
          }))
      }
  };
}

export const signOutUser = (history) => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("loggedInUserInfo");
  history.push("/")
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(setMessage({
    msg: "Signed out Successfully",
    name: 'success'
   }));
};
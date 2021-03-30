import axios from "axios";
import { DOCTOR_REGISTERED,SET_CURRENT_USER,RESET_ALL_STATE,DOCTOR_PROFILE_UPDATED } from './action-types';
import { API_BASE } from '../../config/app-config';
import {startLoader, stopLoader, setMessage } from './util-action';
import {setCurrentUser} from './auth-actions';


// Doctor Profile
export const doctorProfile = (user_id,userData,history) => {
  return async(dispatch) => {
      try {
          dispatch(startLoader());
          const resp = await axios.put(`${API_BASE}/doctor/${user_id}`, userData);
          
          dispatch(stopLoader());
          if(resp.data.status === "success") {
            localStorage.removeItem("loggedInUserInfo");
            localStorage.setItem("loggedInUserInfo", JSON.stringify(resp.data.content));
            dispatch(setCurrentUser(resp.data.content));
              history.push("/")
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


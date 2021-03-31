import { GET_PATIENT_LIST } from './action-types';
import axios from 'axios';
import { API_BASE } from '../../config/app-config';
import {startLoader, stopLoader, setMessage } from './util-action';

const getPatientListDispatcher = (payload) => {
    return {
        type: GET_PATIENT_LIST,
        payload
    }
}

export const getPatientList = (doctor_id) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.get(`${API_BASE}/doctor/patientList`, {
                            params: {doctor_id}
                        });
            
            dispatch(stopLoader());
            if(resp.data.status === "success") {
                dispatch(getPatientListDispatcher(resp.data.content.patients));
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

// Add Patient
export const addPatientInfo = (userData,history) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.post(`${API_BASE}/patient/`,userData);
            
            dispatch(stopLoader());
            if(resp.data.status === "success") {
                dispatch(setMessage({
                    msg: resp.data.msg,
                    name: 'success'
                   }));
                   history.push('/');
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

// Edit Patient
export const editPatientInfo = (userData,history) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.put(`${API_BASE}/patient/${userData.id}`, userData);
            
            dispatch(stopLoader());
            if(resp.data.status === "success") {
                dispatch(setMessage({
                    msg: resp.data.msg,
                    name: 'success'
                   }));
                   history.push('/doctor/patients');
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
  

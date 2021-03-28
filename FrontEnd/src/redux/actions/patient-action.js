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

export const getPatientList = () => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            let doctor_id = localStorage.getItem('doctor_id')
            const resp = await axios.get(`${API_BASE}/doctor/patientList`, {
                            params: {doctor_id}
                        });
            
            dispatch(stopLoader());
            if(resp.status === 200 && resp.data.status === "success") {
                dispatch(getPatientListDispatcher(resp.data.content.patients));
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




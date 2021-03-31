import axios from 'axios';
import { API_BASE } from '../../config/app-config';
import { GET_DIAGNOSIS_LIST, SET_MOST_RECENT_DIAGNOSIS } from './action-types';
import {startLoader, stopLoader, setMessage } from './util-action';

const getDiagnosisListDispatched = (payload) => {
    return {
        type: GET_DIAGNOSIS_LIST,
        payload
    }
}
const setMostRecentDiagnosis = (payload) => {
    return {
        type: SET_MOST_RECENT_DIAGNOSIS,
        payload
    }
}
export const createDiagnosis = (reqBody) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.post(`${API_BASE}/diagnosis`, reqBody);
            dispatch(stopLoader());
            dispatch(setMostRecentDiagnosis(resp.data.content._id))
            dispatch(getDiagnosisList(reqBody.doctor_id))
            dispatch(setMessage({
                msg: resp.data.msg,
                name: 'success'
            }))
        }catch(e) {
            dispatch(stopLoader());
            dispatch(setMessage({
                msg: e.message,
                name: 'danger'
            }))
        }
    };
}


export const updateDiagnosis = (diagnosisID, reqBody) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.put(`${API_BASE}/diagnosis/${diagnosisID}`, reqBody);
            dispatch(stopLoader());
            dispatch(setMostRecentDiagnosis(resp.data.content._id))
            dispatch(getDiagnosisList(reqBody.doctor_id))
            dispatch(setMessage({
                msg: resp.data.msg,
                name: 'success'
            }))
        }catch(e) {
            dispatch(stopLoader());
            dispatch(setMessage({
                msg: e.message,
                name: 'danger'
            }))
        }
    };
}

export const getDiagnosisList = (doctor_id) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.get(`${API_BASE}/diagnosis`, { params : {
                doctor_id: doctor_id
            }});
            dispatch(stopLoader());
            if(resp.status === 200 && resp.data.status === 'success') {
                dispatch(getDiagnosisListDispatched(resp.data.content.length > 0 ? resp.data.content : null))
                dispatch(setMessage({
                    msg: resp.data.msg,
                    name: 'success'
                }))
            } else {
                dispatch(setMessage({
                    msg: resp.data.msg,
                    name: 'danger'
                }))
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




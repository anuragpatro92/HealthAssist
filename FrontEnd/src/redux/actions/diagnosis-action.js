import axios from 'axios';
import { API_BASE } from '../../config/app-config';
import {startLoader, stopLoader, setMessage } from './util-action';

export const createDiagnosis = (reqBody) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.post(`${API_BASE}/diagnosis`, reqBody);
            dispatch(stopLoader());
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

export const getDiagnosisList = (reqBody) => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            const resp = await axios.get(`${API_BASE}/diagnosis`, reqBody);
            dispatch(stopLoader());
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




import { GET_SYMPTOM_LIST, GET_DISEASE_LIST } from './action-types';
import axios from 'axios';
import { API_BASE } from '../../config/app-config';
import {startLoader, stopLoader, setMessage } from './util-action';
import symptoms from '../../mockData/symptoms.json';

const getSymptomListDispatcher = (payload) => {
    return {
        type: GET_SYMPTOM_LIST,
        payload
    }
}
const getDiseaseListDispatcher = (payload) => {
    return {
        type: GET_DISEASE_LIST,
        payload
    }
}

export const getSymptomList = () => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            
            //get list of symptoms from DS API
            const resp = await axios.get(`${API_BASE}/symptoms`);
            dispatch(stopLoader());
            if(resp.status === 200)
                dispatch(getSymptomListDispatcher(resp.data.content.symptoms));
        }catch(e) {
            dispatch(stopLoader());
            dispatch(setMessage({
                msg: e.message,
                name: 'danger'
            }))
        }
    };
}

export const getDiseaseList = () => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            //get list of symptoms from DS API
            const resp = await axios.get(`${API_BASE}/diseases`);
            dispatch(stopLoader());
            if(resp.status === 200)
                dispatch(getDiseaseListDispatcher(resp.data.content.diseases));
        }catch(e) {
            dispatch(stopLoader());
            dispatch(setMessage({
                msg: e.message,
                name: 'danger'
            }))
        }
    };
}




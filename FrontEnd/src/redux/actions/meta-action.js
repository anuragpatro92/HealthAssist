import { GET_SYMPTOM_LIST } from './action-types';
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

export const getSymptomList = () => {
    return async(dispatch) => {
        try {
            dispatch(startLoader());
            
            //get list of symptoms from DS API
            let resp = Object.keys(symptoms)
            dispatch(stopLoader());
            dispatch(getSymptomListDispatcher(resp));
            // if(resp.status === 200 && resp.data.status === "success") {
            //     dispatch(getSymptomListDispatcher(resp.data.content.patients));
            // } 
        }catch(e) {
            dispatch(stopLoader());
            dispatch(setMessage({
                msg: e.message,
                name: 'danger'
            }))
        }
    };
}




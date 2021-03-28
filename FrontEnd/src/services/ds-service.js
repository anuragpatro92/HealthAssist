import axios from 'axios';
import { API_BASE } from '../config/app-config';
import {startLoader, stopLoader } from '../redux/actions/util-action';
import diseases from '../mockData/diseases.json';

export const getDiseasePredictions = (dispatch) => {
    return new Promise((resolve, reject) => {
        try {
            dispatch(startLoader());
            //get disease pred from DS API
            let resp = diseases.diseases;
            let suggestions = [];
            for(let i = 0 ; i < 3; i++) {
                let temp = resp[parseInt(Math.random()* resp.length-1)];
                suggestions.push({
                    disease_id: temp.toLowerCase().split(" ").join("_"),
                    disease_name: temp,
                    status: "Suggested",
                    confidence: Math.random() * 100
                }) 
            }
            dispatch(stopLoader());
            resolve(suggestions);
        }catch(e) {
            dispatch(stopLoader());
            resolve([])
        }
    })
}




import axios from 'axios';
import { DS_API_BASE } from '../config/app-config';
import {startLoader, stopLoader } from '../redux/actions/util-action';
import diseases from '../mockData/diseases.json';
import mockDrugs from '../mockData/drugRec.json';

export const getDiseasePredictions = (symptoms, dispatch) => {
    return new Promise(async(resolve, reject) => {
        try {
            dispatch(startLoader());
            const resp = await axios.post(`${DS_API_BASE}/diseasePrediction`, {symptoms});
            dispatch(stopLoader());
            if(resp.status === 200) {
                
                resolve(Object.keys(resp.data.diseases).map(d =>  {
                    return {
                        disease_id: d,
                        disease_name: d,
                        status : "Suggested",
                        confidence: resp.data.diseases[d]
                    }
                }))
            }
        }catch(e) {
            dispatch(stopLoader());
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
            resolve(suggestions)
        }
    })
}



export const getDrugRecommendations = (symptoms, disease, dispatch) => {
    return new Promise(async(resolve, reject) => {
        try {
            dispatch(startLoader());
            const resp = await axios.post(`${DS_API_BASE}/drugReccomendation`, {symptoms, disease: disease.disease_name});
            dispatch(stopLoader());
            if(resp.status === 200) {
                let drugList = [...resp.data.good_drugs, ...resp.data.bad_drugs];
                let goodDrugs = new Set(resp.data.good_drugs);
                let badDrugs = new Set(resp.data.bad_drugs);
                resolve({drugList, goodDrugs, badDrugs});
            }
        }catch(e) {
            dispatch(stopLoader());
            resolve(mockDrugs);
        }
    })
}




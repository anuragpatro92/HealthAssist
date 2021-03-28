'use strict';

const PatientModel = require('../../models/patients');

//not done
const getPatientDetails = (patient_id) => new Promise(async(resolve, reject) => {
        try {
            let query = PatientModel.findOne({ id : patient_id });
            const result = await query.exec();
            if(result) {
                resolve(result);
            } else {
                throw new Error("No Patient Found")
            }
        }catch(e) {
            console.log(e);
            reject(e);
        }
})

module.exports = { getPatientDetails }
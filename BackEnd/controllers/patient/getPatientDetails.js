'use strict';

const PatientModel = require('../../models/patients');

const getPatientDetails = (id) => new Promise(async(resolve, reject) => {
        try {
            let query = PatientModel.findOne({_id: id});
            const result = await query.exec();
            if(result) {
                resolve(result);
            } else {
                throw new Error("No Patient Found")
            }
        }catch(e) {
            reject(e);
        }
})

module.exports = { getPatientDetails }
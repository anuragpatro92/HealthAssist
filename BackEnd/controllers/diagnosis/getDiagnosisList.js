'use strict';

const DiagnosisModel = require('../../models/diagnoses');

const getDiagnosisList = (doctor_id) => new Promise(async(resolve, reject) => {
        try {
            let query = DiagnosisModel
                        .find({ doctor_id })
                        .sort({updated_at: 'desc'})
                        .populate('patient_id')
            const result = await query.exec();
            if(result) {
                resolve(result);
            } else {
                throw new Error("Could not fetch diagnosis list")
            }
        }catch(e) {
            console.log(e);
            reject(e);
        }
});

module.exports = { getDiagnosisList }
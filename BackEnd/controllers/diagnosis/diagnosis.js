'use strict';

const DiagnosisModel = require('../../models/diagnoses');

const addDiagnosis = (patient_id,doctor_id,status,symptoms, diseases,drugs) => new Promise(async(resolve, reject) => {
        try {
            const diagnosis = new DiagnosisModel({patient_id,doctor_id,status,symptoms, diseases,drugs});
            const saveResult = await diagnosis.save();
              //checking whether able to save diagnosis info or not
              if(saveResult) resolve(saveResult);
              else throw new Error("Diagnosis Info Saving Failed");
        }catch(e) {
            reject(e);
        }
});

const updateDiagnosis = (id,patient_id,doctor_id,status,symptoms, diseases,drugs) => new Promise(async(resolve, reject) => {
    try {
        let query = DiagnosisModel.findByIdAndUpdate(id,{$set: {patient_id,doctor_id,status,symptoms, diseases,drugs}},{new:true});
        const result = await query.exec();
        if(result) {
            resolve(result);
        } else {
            throw new Error("Diagnosis Info Updation Failed")
        }
    }catch(e) {
        reject(e);
    }
});

module.exports = { addDiagnosis , updateDiagnosis}